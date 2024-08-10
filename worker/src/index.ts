import { Kafka } from "kafkajs"
import prismaClient from './prismaClient'
const kafka = new Kafka({
    clientId: "worker-kafka",
    brokers: ['localhost:9092'],
})


async function workOnZapRunBox() {

    const consumer = kafka.consumer({ groupId: "zapier-consumers" });
    await consumer.connect();
    await consumer.subscribe({
        topic: "zap-events", fromBeginning: true
    })

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                offset: message.offset,
                value: message?.value?.toString(),
            })

            const parsedMessage = JSON.parse(message.value.toString())

            const zap = await prismaClient.zapRuns.findFirst({
                where: {
                    id: parsedMessage.zapId,
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                select: {
                                    id: true,
                                    availableActionId: true,
                                    metaData: true,  // Include metaData here
                                },
                            },
                        }
                    },
                },
            })

            zap?.zap.actions.forEach(element => {
                if (element.availableActionId == "email") {
                    console.log(element.metaData)
                    console.log("workdone")
                    console.log(zap.webhookMetaData)
                }
            });
        },
    })


}


workOnZapRunBox();