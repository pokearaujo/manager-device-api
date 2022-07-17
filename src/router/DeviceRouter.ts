import { Router } from "express";
import { deviceService } from "./../services/DeviceService";
import { normalizeString } from "./../common";

const router = Router();

router.get("/", async (req, res) => {
  const list = await deviceService.getList();

  res.send(list);
});

router.post("/search", async (req, res) => {
  const list = await deviceService.getList();

  const name = req.body.name;

  const device = list.find((d) =>
    normalizeString(d.name)
      .toLowerCase()
      .includes(normalizeString(name).toLowerCase())
  );

  res.send(device);
});

router.get("/switch/:status", async (req, res) => {
  const list = await deviceService.getList();

  const name = req.query.name as string;

  const device = list.find((d) =>
    normalizeString(d.name)
      .toLowerCase()
      .includes(normalizeString(name).toLowerCase())
  );

  if (device) {
    await deviceService.sendCommand(
      device.id,
      "switch_led",
      req.params.status == "on"
    );
  }

  res.send({
    sent: true,
  });
});

router.get("/:id", async (req, res) => {
  const device = await deviceService.getDevice(req.params.id);

  return res.json(device);
});

router.get("/:id/status", async (req, res) => {
  const status = await deviceService.getStatus(req.params.id);

  return res.json(status);
});

router.post("/:id/command", async (req, res) => {
  const result = await deviceService.sendCommand(
    req.params.id,
    req.body.code,
    req.body.value
  );

  res.send({
    success: result,
  });
});

export default router;
