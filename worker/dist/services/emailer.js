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
exports.default = emailSender;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.NDOEMAILER_USERNAME,
        pass: process.env.NDOEMAILER_PASSWORD
    },
    secure: true,
    tls: { rejectUnauthorized: false }
});
function emailSender(_a) {
    return __awaiter(this, arguments, void 0, function* ({ receiverEmail, subject, text }) {
        console.log(text);
        const mailOptions = {
            from: "zapierautomationservice@gmail.com",
            to: receiverEmail,
            subject: subject,
            text: JSON.stringify(text),
            html: `<p>${text}</p>`
        };
        try {
            yield transporter.verify();
            console.log("Server is ready to take our messages"); // Debug line
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email sent:", info); // Debug line
            return {
                status: 200,
                info: info
            };
        }
        catch (error) {
            console.error("Email sending error:", error); // Detailed error logging
            throw new Error("Failed to send email");
        }
    });
}
