"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZapSchema = void 0;
const zod_1 = require("zod");
const createZapSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    requestedActions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        metaData: zod_1.z.string().optional()
    })),
    requestedTrigger: zod_1.z.array(zod_1.z.object({
        availableTriggerId: zod_1.z.string(),
        metaData: zod_1.z.string().optional()
    })),
});
exports.createZapSchema = createZapSchema;
