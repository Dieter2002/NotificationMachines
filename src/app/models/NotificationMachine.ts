/** This NotificationMachine API interface is used to configure and display desktop notifications to the user. */
export class NotificationMachine {
  id: number;
  machine: string;
  machineSensorId: string;
  sensor: string;
  message: string;
  fixed: boolean
  icon: string;
  symbolForUrl: string;
  type?: string;
  visible?: boolean;

  constructor(icon: string, machine: string, machineSensorId: string,
    sensor: string, fixed: boolean, message: string, symbolForUrl: string, type: string) {
    this.id = 0;
    this.icon = icon;
    this.machine = machine;
    this.machineSensorId = machineSensorId;
    this.sensor = sensor;
    this.fixed = fixed;
    this.message = message;
    this.symbolForUrl = symbolForUrl;
    this.type = type;
    this.visible = true;
  }
}
