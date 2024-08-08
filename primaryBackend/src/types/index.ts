import { array, ParseStatus, string, z } from 'zod'

const createZapSchema = z.object({
    requestedActions: z.array(z.object({
        availableActionId: z.string(),
        metaData: z.object({
            subject: z.string(),
            body: z.string(),
        })
    })),
    requestedTrigger: z.object({
        availableTriggerId: z.string(),
        metaData: z.string().optional()
    })
})


const signUpSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
    firstName : z.string(),
    lastName : z.string()
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string().max(10),
})

export { createZapSchema, signInSchema , signUpSchema}