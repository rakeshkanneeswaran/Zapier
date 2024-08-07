import { Router } from "express";
import authMiddleware from "../authMiddleware";
import { prismaClient } from "../config";


const router = Router();
router.get("/", authMiddleware, async (req, res) => {

    try {

        const availableTrigger = await prismaClient.availableTrigger.findMany({});
        res.status(200).json({
            availableTrigger: availableTrigger
        })
    } catch (error) {
        res.status(500).json({
            error: 'internal server error'
        })
    }

})
const triggerRouter = router;
export { triggerRouter }

