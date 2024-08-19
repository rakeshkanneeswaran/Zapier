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
const kafkajs_1 = require("kafkajs");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const emailer_1 = __importDefault(require("./services/emailer"));
const broker = process.env.kafka_broker || 'localhost:9092';
const topic = process.env.kafka_topic || 'zap-events';
const kafka = new kafkajs_1.Kafka({
    clientId: "processKafka",
    brokers: [broker],
});
function workOnZapRunBox() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: "zapier-consumers" });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: topic, fromBeginning: true
        });
        consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                console.log({
                    offset: message.offset,
                    value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                if (message.value == null) {
                    console.log("value is null");
                    return;
                }
                const parsedMessage = JSON.parse(message.value.toString());
                const zap = yield prismaClient_1.default.zapRuns.findFirst({
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
                                        metaData: true, // Include metaData here
                                    },
                                }
                            }
                        },
                    },
                });
                zap === null || zap === void 0 ? void 0 : zap.zap.actions.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    if (element.availableActionId == "email") {
                        //@ts-ignore
                        const payload = JSON.parse(element.metaData);
                        console.log(typeof (payload.body));
                        console.log(element.metaData);
                        if (zap.webhookMetaData == null, element.metaData == null) {
                            return;
                        }
                        else {
                            //@ts-ignore
                            const webhookdata = JSON.parse(zap.webhookMetaData);
                            for (let index = 0; index < webhookdata.toEmail.length; index++) {
                                const result = yield (0, emailer_1.default)({
                                    receiverEmail: JSON.stringify(webhookdata.toEmail[index]),
                                    subject: payload.subject,
                                    text: payload.body
                                });
                                console.log(result);
                            }
                        }
                        console.log("workdone");
                    }
                }));
            }),
        });
    });
}
workOnZapRunBox();
