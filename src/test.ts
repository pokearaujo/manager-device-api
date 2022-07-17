import { deviceService } from "./services/DeviceService";
// @ts-ignore
import TuyAPI from "tuyapi";

(async () => {
  const list = await deviceService.getList(true);

  const firstDevice = list[0];

  const device = new TuyAPI({
    id: firstDevice.id,
    key: firstDevice.local_key,
    version: 3.3,
    issueGetOnConnect: true,
    issueRefreshOnConnect: true,
  });

  // Find device on network
  device.find().then(() => {
    // Connect to device
    device.connect();
  });

  // Add event listeners
  device.on("connected", () => {
    console.log("Connected to device!");
  });

  device.on("disconnected", () => {
    console.log("Disconnected from device.");
  });

  device.on("error", (error: any) => {
    console.log("Error!", error);
  });

  device.on("dp-refresh", (data: any) => {
    console.log("DP_REFRESH data from device: ", data);
  });

  device.on("data", (data: any) => {
    console.log("Data from device:", data);

    console.log(`Boolean status of default property: ${data.dps["20"]}.`);

    // Set default property to opposite
    device.set({ dps: 20, set: !data.dps["20"] });

    // Otherwise we'll be stuck in an endless
    // loop of toggling the state.
  });
})();
