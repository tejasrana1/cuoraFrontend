import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "1902e2c025c0448a87f194d2579f4078";
const token =
"0061902e2c025c0448a87f194d2579f4078IACoo4+YMk8vzr3qxReUsDMmI5MUDg5Y0RGrxvRQhkA3yGTNKL8AAAAAEAD/8ff9+eGDYgEAAQD34YNi";
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
