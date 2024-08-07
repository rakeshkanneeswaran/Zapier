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
const express_1 = require("express");
const config_1 = require("../config");
const types_1 = require("../types");
const authMiddleware_1 = __importDefault(require("../authMiddleware"));
config_1.prismaClient.$connect();
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate input
    const parsedBody = types_1.createZapSchema.safeParse(req.body);
    console.log(parsedBody);
    if (!parsedBody.success) {
        return res.status(400).json({
            error: "Improper inputs",
            details: parsedBody.error.errors, // Include validation errors if needed
        });
    }
    try {
        const result = yield config_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Create Zap
            const zap = yield tx.zap.create({
                data: {
                    userId: parsedBody.data.userId,
                },
            });
            // Create Actions
            const actionPromises = parsedBody.data.requestedActions.map((action) => __awaiter(void 0, void 0, void 0, function* () {
                return tx.action.create({
                    data: {
                        availableActionId: action.availableActionId,
                        zapId: zap.id,
                        metaData: JSON.stringify({
                            body: action.metaData.body,
                            subject: action.metaData.subject,
                            adminEmail: action.metaData.adminEmail
                        })
                    },
                });
            }));
            const TriggerPromises = parsedBody.data.requestedTrigger.map((trigger) => __awaiter(void 0, void 0, void 0, function* () {
                return tx.trigger.create({
                    data: {
                        availableTriggerId: trigger.availableTriggerId,
                        zapId: zap.id,
                        metaData: trigger.metaData,
                    },
                });
            }));
            yield Promise.all(actionPromises);
            return {
                zapId: zap.id,
            };
        }));
        // Respond with the result
        res.status(201).json({ "zapId": result.zapId });
    }
    catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({
            error: "An error occurred while creating the zap and actions.",
        });
    }
}));
router.get("/allzaps", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    console.log(id);
    const zaps = yield config_1.prismaClient.zap.findMany({
        where: {
            userId: id
        },
        select: {
            actions: true,
            triggers: true
        }
    });
    return res.json({
        zaps: zaps
    });
}));
const zapRouter = router;
exports.default = zapRouter;
