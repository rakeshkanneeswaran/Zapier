import prismaClient from './prismaClient'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "processKafka",
    brokers: ['localhost:9092'],
})

async function processZapRunOutBox() {

    const producer = kafka.producer()
    producer.connect()

    while (true) {
        const zapRun = await prismaClient.zapRunOutBox.findMany({
        })
        producer.send({
            topic: "zap-events",
            messages: zapRun.map((runs) => {
                return {
                    value: JSON.stringify({
                        zapId: runs.zapRunId
                    })
                }
            })
        })
        console.log(zapRun)

        await prismaClient.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: zapRun.map((zaprun) => {
                        return zaprun.id
                    })
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }

}

processZapRunOutBox()


