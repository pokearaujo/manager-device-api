import { Router } from "express";
import deviceRouter from "./router/DeviceRouter";

const router = Router();

router.use("/device", deviceRouter);

export default router;
