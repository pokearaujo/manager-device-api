import { IDevice } from "../interfaces/IDevice";
import { getContext } from "./../tuya";
import { IDeviceStatus } from "./../interfaces/IDevice";

class DeviceService {
  public async getList(allData?: boolean): Promise<IDevice[]> {
    const result = await getContext().request<{ devices: IDevice[] }>({
      path: `/v1.0/iot-01/associated-users/devices?size=100`,
      method: "GET",
    });

    if (allData) {
      return result.result?.devices;
    }

    return result.result?.devices.map((d) => ({
      id: d.id,
      name: d.name,
      icon: d.icon,
      online: d.online,
      category: d.category,
      status: d.status,
    }));
  }

  public async getDevice(
    deviceId: string,
    allData?: boolean
  ): Promise<IDevice> {
    const result = await getContext().request<IDevice>({
      path: `/v1.0/iot-01/devices/${deviceId}`,
      method: "GET",
    });

    if (allData) {
      return result.result;
    }

    return {
      id: result.result.id,
      name: result.result.name,
      icon: result.result.icon,
      online: result.result.online,
      category: result.result.category,
      status: result.result.status,
    };
  }

  public async sendCommand(deviceId: string, code: string, value: any) {
    const result = await getContext().request({
      path: `/v1.0/devices/${deviceId}/commands`,
      method: "POST",
      body: {
        commands: [
          {
            code,
            value,
          },
        ],
      },
    });

    return result.success;
  }

  public async getStatus(deviceId: string) {
    const result = await getContext().request<IDeviceStatus[]>({
      path: `/v1.0/devices/${deviceId}/status`,
      method: "GET",
    });

    return result?.result;
  }
}

export const deviceService = new DeviceService();
