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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3002;
const prismaClient_1 = __importDefault(require("./prismaClient"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/hooks/catch/:uerId/:zapId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uerId;
    const zapId = req.params.zapId;
    console.log("New hook triggered for user :", userId, "on zap :", zapId);
    // Get the zap details with triggers and actions
    const zap = yield prismaClient_1.default.zap.findFirst({
        where: {
            id: zapId,
            userId: userId
        },
        include: {
            triggers: true,
            actions: true
        }
    });
    // If the zap does not exist, return a 404 status code and error message.
    if (!(zap === null || zap === void 0 ? void 0 : zap.id)) {
        return res.sendStatus(404).json({
            "error": "unable to find the zap"
        });
    }
    const zapRun = yield prismaClient_1.default.zapRuns.create({
        data: {
            zapId: zap.id,
        }
    });
    const zapRunOutbox = yield prismaClient_1.default.zapRunOutBox.create({
        data: {
            zapRunId: zapRun.id,
        }
    });
    return res.json({
        message: "Hook triggered successfully",
        zapId: zap.id,
        zapRunId: zapRun.id,
        zapRunOutbox: zapRunOutbox.id,
        userId: zap === null || zap === void 0 ? void 0 : zap.userId,
        triggers: zap.triggers,
        actions: zap.actions
    });
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
