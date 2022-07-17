import express from "express";
import { PORT } from "./settings";
import { authMiddleware } from "./middlewares/AuthMiddleware";
import router from "./router";

(async () => {
  const app = express();

  app.use(express.json());

  app.use("/", authMiddleware, router);

  app.use("/", (req, res) => {
    res.send({
      deviceManager: 1,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
