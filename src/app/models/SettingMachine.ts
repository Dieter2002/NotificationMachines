import { ConnectedSensors } from "./BekidanFillerItem";

export class SettingMachine{
  id: string = ""
  machineName: string = "";
  ipaddress: string = "";
  blockNotifications?: boolean = false;
  blockSound?: boolean = false;
  connectedSensors: Array<ConnectedSensors> = [];
}
