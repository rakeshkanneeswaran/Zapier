"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = exports.createZapSchema = void 0;
const zod_1 = require("zod");
const createZapSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    requestedActions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        metaData: zod_1.z.object({
            subject: zod_1.z.string(),
            body: zod_1.z.string(),
            adminEmail: zod_1.z.string()
        })
    })),
    requestedTrigger: zod_1.z.array(zod_1.z.object({
        availableTriggerId: zod_1.z.string(),
        metaData: zod_1.z.string().optional()
    })),
});
exports.createZapSchema = createZapSchema;
const signUpSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().max(10),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string()
});
exports.signUpSchema = signUpSchema;
const signInSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().max(10),
});
exports.signInSchema = signInSchema;
