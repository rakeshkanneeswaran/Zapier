import { Kafka } from "kafkajs"
import prismaClient from './prismaClient'
import emailSender from "./services/emailer";
const broker = process.env.kafka_broker || 'localhost:9092'
const topic = process.env.kafka_topic || 'zap-events'

const kafka = new Kafka({
    clientId: "processKafka",
    brokers: [broker],
})

async function workOnZapRunBox() {

    const consumer = kafka.consumer({ groupId: "zapier-consumers" });
    await consumer.connect();
    await consumer.subscribe({
        topic: topic, fromBeginning: true
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
                    console.log(typeof (payload.body))
                    console.log(element.metaData)
                    if (zap.webhookMetaData == null, element.metaData == null) {

                        return;
                    }
                    else {
                        //@ts-ignore
                        const webhookdata = JSON.parse(zap.webhookMetaData)
                        for (let index = 0; index < webhookdata.toEmail.length; index++) {

                            const result = await emailSender({
                                receiverEmail: JSON.stringify(webhookdata.toEmail[index]),
                                subject: payload.subject,
                                text: payload.body
                            })
                            console.log(result)
                        }

                    }
                    console.log("workdone")
                }
            });
        },
    })


}


workOnZapRunBox();