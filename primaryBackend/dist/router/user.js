"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const types_1 = require("../types");
const config_2 = require("../config");
const router = (0, express_1.Router)();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = types_1.siginSchema.safeParse(req.body);
    console.log(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            error: "Improper inputs"
        });
    }
    try {
        const user = yield config_1.prismaClient.user.findFirst({
            where: {
                username: parsedBody.data.username,
                password: parsedBody.data.password
            }
        });
        console.log(user);
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(404).json({
                error: "User not found, please create an account"
            });
        }
        else {
            if (!config_2.jwt_password) {
                return res.json({
                    message: "server unable to auntheticate"
                });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, // Assuming `user.id` is the correct field
            config_2.jwt_password // Optional: set token expiration time
            );
            return res.status(200).json({
                token: token
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}));
const userRouter = router;
exports.default = userRouter;
