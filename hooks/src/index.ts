import express from "express";
import cors from "cors"
const PORT = 3002
import prismaClient from "./prismaClient";
const app = express();
app.use(express.json());
app.use(cors())

app.post("/hooks/catch/:uerId/:zapId", async (req, res) => {

    const userId = req.params.uerId;
    const webhookMetaData = req.body.webhookMetaData;
    const zapId = req.params.zapId;
    console.log("New hook triggered for user :", userId, "on zap :", zapId)

    // Get the zap details with triggers and actions
    const zap = await prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: userId
        },
        include: {
            triggers: true,
            actions: true
        }
    })

    // If the zap does not exist, return a 404 status code and error message.
    if (!zap?.id) {
        return res.sendStatus(404).json({
            "error": "unable to find the zap"
        })
    }


    const zapRun = await prismaClient.zapRuns.create({
        data: {
            zapId: zap.id,
            webhookMetaData: JSON.stringify(webhookMetaData)


        }
    })

    const zapRunOutbox = await prismaClient.zapRunOutBox.create({
        data: {
            zapRunId: zapRun.id,
            webhookMetaData: JSON.stringify(webhookMetaData)
        }
    })

    return res.json({
        message: "Hook triggered successfully",
        zapId: zap.id,
        zapRunId: zapRun.id,
        zapRunOutbox: zapRunOutbox.id,
        userId: zap?.userId,
        triggers: zap.triggers,
        actions: zap.actions

    })

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

