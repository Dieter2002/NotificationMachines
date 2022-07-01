import { ConnectedSensors } from "./BekidanFillerItem";

export class SettingMachine{
  constructor(newCreated: boolean){
    this.newCreated = newCreated;
  }

  id: string = ""
  machineName: string = "";
  ipaddress: string = "";
  blockNotifications?: boolean = false;
  blockSound?: boolean = false;
  connectedSensors: Array<ConnectedSensors> = [];
  newCreated: boolean;
}
