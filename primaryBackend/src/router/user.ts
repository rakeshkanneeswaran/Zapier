import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "../config";
import { siginSchema } from "../types";
import { jwt_password } from "../config";

const router = Router();

router.post("/signin", async (req, res) => {
    const parsedBody = siginSchema.safeParse(req.body);
    console.log(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            error: "Improper inputs"
        });
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: parsedBody.data.username,
                password: parsedBody.data.password
            }
        });

        console.log(user)

        if (!user?.id) {
            return res.status(404).json({
                error: "User not found, please create an account"
            });
        }
        else {
            if (!jwt_password) {
                return res.json({
                    message: "server unable to auntheticate"
                })
            }
            const token = jwt.sign(
                { id: user.id }, // Assuming `user.id` is the correct field
                jwt_password // Optional: set token expiration time
            );

            return res.status(200).json({
                token: token
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

const userRouter = router
export default userRouter;
