import { json, Router } from "express";
import { prismaClient } from "../config";
import { createZapSchema } from "../types";
import { Request } from "express";
import authMiddleware from "../authMiddleware";

prismaClient.$connect();
const router = Router();
interface authenticatedRequest extends Request {
    id?: string
}

router.post("/", authMiddleware, async (req, res) => {
    // Validate input
    console.log(req.body.id)

    const parsedBody = createZapSchema.safeParse(req.body);
    console.log(parsedBody)
    if (!parsedBody.success) {
        console.log(parsedBody.error.errors)
        return res.status(400).json({
            error: "Improper inputs",
            details: parsedBody.error.errors, // Include validation errors if needed
        });
    }
    try {
        const result = await prismaClient.$transaction(async (tx) => {
            // Create Zap
            const zap = await tx.zap.create({
                data: {
                    userId: req.body.id,
                },
            });
            console.log(zap)

            // Create Actions
            const actionPromises = parsedBody.data.requestedActions.map(async (action) => {
                return tx.action.create({
                    data: {
                        availableActionId: action.availableActionId,
                        zapId: zap.id,
                        metaData: JSON.stringify({
                            body: action.metaData.body,
                            subject: action.metaData.subject,

                        })
                    },
                });
            });

            const TriggerPromises =  await tx.trigger.create({
                data: {
                    availableTriggerId: parsedBody.data.requestedTrigger.availableTriggerId,
                    zapId: zap.id,
                    metaData: parsedBody.data.requestedTrigger.metaData,
                },
            });
                


            await Promise.all(actionPromises);
            return {
                zapId: zap.id,
            };
        });

        // Respond with the result
        res.status(201).json({ "zapId": result.zapId });
    } catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({
            error: "An error occurred while creating the zap and actions.",
        });
    }
});


router.get("/allzaps", authMiddleware, async (req: authenticatedRequest, res) => {

    const id = req.id;
    console.log(id)
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        select: {
            actions: true,
            triggers: true
        }
    })
    return res.json({
        zaps: zaps
    }
    )

})



const zapRouter = router;

export default zapRouter
