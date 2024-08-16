"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("./prismaClient"));
const kafkajs_1 = require("kafkajs");
const broker = process.env.kafka_broker || 'localhost:9092';
const topic = process.env.kafka_topic || 'zap-events';
const kafka = new kafkajs_1.Kafka({
    clientId: "processKafka",
    brokers: [broker],
});
function processZapRunOutBox() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        const admin = kafka.admin();
        admin.connect();
        producer.connect();
        const topics = yield admin.listTopics();
        console.log("Topics:", topics);
        if (!topics.includes(topic)) {
            admin.createTopics({
                topics: [{
                        topic: topic,
                        numPartitions: 1, // Number of partitions
                        replicationFactor: 1, // Replication factor
                    }]
            });
        }
        while (true) {
            const zapRun = yield prismaClient_1.default.zapRunOutBox.findMany({});
            producer.send({
                topic: topic,
                messages: zapRun.map((runs) => {
                    return {
                        value: JSON.stringify({
                            zapId: runs.zapRunId
                        })
                    };
                })
            });
            console.log(zapRun);
            yield prismaClient_1.default.zapRunOutBox.deleteMany({
                where: {
                    id: {
                        in: zapRun.map((zaprun) => {
                            return zaprun.id;
                        })
                    }
                }
            });
            yield new Promise(r => setTimeout(r, 3000));
        }
    });
}
processZapRunOutBox();
