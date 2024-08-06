import { array, z } from 'zod'

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

export { createZapSchema }