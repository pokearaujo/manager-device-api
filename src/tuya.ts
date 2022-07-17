import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import { TUYA_BASE_URL, TUYA_CLIENT_ID, TUYA_CLIENT_SECRET } from "./settings";

const context = new TuyaContext({
  baseUrl: TUYA_BASE_URL,
  accessKey: TUYA_CLIENT_ID,
  secretKey: TUYA_CLIENT_SECRET,
});

export const getContext = () => context;
