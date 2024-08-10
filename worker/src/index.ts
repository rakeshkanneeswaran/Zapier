import { Kafka } from "kafkajs"
import prismaClient from './prismaClient'
import emailSender from "./services/emailer";
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


            if (message.value == null) {
                console.log("value is null")
                return;
            }

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
                            }
                        }
                    },
                },
            })


            zap?.zap.actions.forEach(async (element) => {
                if (element.availableActionId == "email") {
                    //@ts-ignore
                    const payload = JSON.parse(element.metaData)
                    console.log(typeof(payload.body))
                    console.log(element.metaData)
                    if (zap.webhookMetaData == null, element.metaData == null) {

                        return;
                    }
                    else {
                        //@ts-ignore
                        const webhookdata = JSON.parse(zap.webhookMetaData)
                        const result = await emailSender({
                            receiverEmail: JSON.stringify(webhookdata.toEmail),
                            subject: payload.subject,
                            text: payload.body
                        })
                        console.log(result)
                    }

                    console.log("workdone")

                }
            });
        },
    })


}


workOnZapRunBox();