import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "../config";
import { signInSchema, signUpSchema } from "../types";
import { jwt_password } from "../config";

const router = Router();

// Sign In Route
router.post("/signin", async (req, res) => {
    const parsedBody = signInSchema.safeParse(req.body);
    console.log(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            error: "Improper inputs",
            details: parsedBody.error.errors // Include validation errors if needed
        });
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: parsedBody.data.username,
                password: parsedBody.data.password
            }
        });

        console.log(user);

        if (!user?.id) {
            return res.status(404).json({
                error: "User not found, please create an account."
            });
        } else {
            if (!jwt_password) {
                return res.status(500).json({
                    error: "Server unable to authenticate."
                });
            }
            const token = jwt.sign(
                { id: user.id },
                jwt_password,
                { expiresIn: '1h' } // Optional: set token expiration time
            );

            return res.status(200).json({
                message: "Authentication successful.",
                token: token
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error."
        });
    }
});

// Sign Up Route
router.post("/signup", async (req, res) => {
    const parsedBody = signUpSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            error: "Improper inputs",
            details: parsedBody.error.errors // Include validation errors if needed
        });
    } else {
        const userExist = await prismaClient.user.findFirst({
            where: {
                username: parsedBody.data.username
            }
        });

        if (userExist) {
            return res.status(409).json({
                error: "Username already exists. Please choose a different username."
            });
        }

        const user = await prismaClient.user.create({
            data: {
                firstName: parsedBody.data.firstName,
                username: parsedBody.data.username,
                lastName: parsedBody.data.lastName,
                password: parsedBody.data.password
            }
        });

        return res.status(201).json({
            message: "Account successfully created."
        });
    }
});

const userRouter = router;
export default userRouter;
