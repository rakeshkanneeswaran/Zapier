import express from "express";
import cors from "cors"
const PORT = 3000
import userRouter from "./router/user";
import zapRouter from "./router/zap";
import { actionRouter } from "./router/actions";
import { triggerRouter } from "./router/trigger";
const app = express();
app.use(cors())




app.use(express.json())

app.use("/api/v1/zap", zapRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/action", actionRouter)
app.use("/api/v1/trigger", triggerRouter)
app.listen(PORT, () => {
    console.log("http://localhost:3000")
})

