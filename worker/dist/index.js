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
const kafka = new kafkajs_1.Kafka({
    clientId: "worker-kafka",
    brokers: ['localhost:9092'],
});
function workOnZapRunBox() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: "zapier-consumers" });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: "zap-events", fromBeginning: true
        });
        consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                console.log({
                    offset: message.offset,
                    value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
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
                zap === null || zap === void 0 ? void 0 : zap.zap.actions.forEach(element => {
                    if (element.availableActionId == "email") {
                        console.log(element.metaData);
                        console.log("workdone");
                        console.log(zap.webhookMetaData);
                    }
                });
            }),
        });
    });
}
workOnZapRunBox();
