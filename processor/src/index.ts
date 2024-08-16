import prismaClient from './prismaClient'
import { Kafka } from 'kafkajs'

const broker = process.env.kafka_broker || 'localhost:9092'
const topic = process.env.kafka_topic || 'zap-events'

const kafka = new Kafka({
    clientId: "processKafka",
    brokers: [broker],
})

async function createTopicIfNotExists() {
    const admin = kafka.admin();
    try {
        await admin.connect();
        const topics = await admin.listTopics();
        console.log("Topics:", topics);
        
        if (!topics.includes(topic)) {
            console.log(`Creating topic ${topic}`);
            await admin.createTopics({
                topics: [{
                    topic: topic,
                    numPartitions: 1, // Number of partitions
                    replicationFactor: 1, // Replication factor
                }]
            });
            console.log(`Topic ${topic} created`);
        } else {
            console.log(`Topic ${topic} already exists`);
        }
    } catch (error) {
        console.error(`Error creating topic ${topic}:`, error);
    } finally {
        await admin.disconnect();
    }
}

async function processZapRunOutBox() {
    const producer = kafka.producer();
    try {
        await createTopicIfNotExists();
        await producer.connect();

        while (true) {
            const zapRun = await prismaClient.zapRunOutBox.findMany({});
            console.log("ZapRun items:", zapRun);

            if (zapRun.length > 0) {
                await producer.send({
                    topic: topic,
                    messages: zapRun.map((runs) => ({
                        value: JSON.stringify({
                            zapId: runs.zapRunId
                        })
                    }))
                });
                console.log(`Sent ${zapRun.length} messages to topic ${topic}`);

                await prismaClient.zapRunOutBox.deleteMany({
                    where: {
                        id: {
                            in: zapRun.map(zaprun => zaprun.id)
                        }
                    }
                });
                console.log("Deleted processed zapRun items");
            } else {
                console.log("No zapRun items found");
            }

            await new Promise(r => setTimeout(r, 3000)); // Sleep for 3 seconds
        }
    } catch (error) {
        console.error("Error processing zapRun:", error);
    } finally {
        await producer.disconnect();
    }
}

processZapRunOutBox().catch(console.error);
