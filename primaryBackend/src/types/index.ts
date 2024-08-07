import { array, ParseStatus, z } from 'zod'

const createZapSchema = z.object({
    userId: z.string(),
    requestedActions: z.array(z.object({
        availableActionId: z.string(),
        metaData: z.string().optional()
    })),
    requestedTrigger: z.array(z.object({
        availableTriggerId: z.string(),
        metaData: z.string().optional()
    })),
})

const siginSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
})

export { createZapSchema, siginSchema }