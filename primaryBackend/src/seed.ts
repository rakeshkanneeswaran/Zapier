import { prismaClient } from "./config"


async function main() {
    const action = await prismaClient.availableAction.createMany({
        data: {
            id: 'email',
            name: "Email"
        }
    })
    console.log({ action })
    const trigger = await prismaClient.availableTrigger.create({
        data: {
            id: 'webhook',
            name: "Webhook"
        }
    })
    console.log({ trigger })
}
main()