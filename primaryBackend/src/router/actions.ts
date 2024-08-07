import { Router } from "express";
import authMiddleware from "../authMiddleware";
import { prismaClient } from "../config";


const router = Router();
router.get("/", authMiddleware, async (req, res) => {

    try {

        const availableAction = await prismaClient.availableAction.findMany({});
        res.status(200).json({
            availableAction: availableAction
        })
    } catch (error) {
        res.status(500).json({
            error: 'internal server error'
        })
    }

})


const actionRouter = router;
export { actionRouter }

