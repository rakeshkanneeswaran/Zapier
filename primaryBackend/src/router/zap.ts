import { Router } from "express";
import { prismaClient } from "../config";
import { createZapSchema } from "../types";

prismaClient.$connect();
const router = Router();

router.post("/", async (req, res) => {
    // Validate input
    const parsedBody = createZapSchema.safeParse(req.body);
    console.log(parsedBody)
    if (!parsedBody.success) {
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
                    userId: parsedBody.data.userId,
                },
            });

            // Create Actions
            const actionPromises = parsedBody.data.requestedActions.map(async (action) => {
                return tx.action.create({
                    data: {
                        availableActionId: action.availableActionId,
                        zapId: zap.id,
                        metaData: action.metaData,
                    },
                });
            });

            const TriggerPromises = parsedBody.data.requestedTrigger.map(async (trigger) => {
                return tx.trigger.create({
                    data: {
                        availableTriggerId: trigger.availableTriggerId,
                        zapId: zap.id,
                        metaData: trigger.metaData,
                    },
                });
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

const zapRouter = router;

export default zapRouter
