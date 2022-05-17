export class ConnectedSensors{
  Id!: number
  machineSensorId!: string
  sensorName!: string
  symbolForUrl!: string
  valueTrue!: string
  valueFalse!: string

  constructor(_MachineSensorId?: string,_SensorName?: string, _SymbolForUrl?: string, _valueTrue?: string, _valueFalse?: string){
    this.machineSensorId = _MachineSensorId!
    this.sensorName = _SensorName!
    this.symbolForUrl = _SymbolForUrl!
    this.valueTrue = _valueTrue!
    this.valueFalse = _valueFalse!
  }
}

export class BekidanFillerItem{
  machineName!: string
  ipAddress!: string
  machineSensorId!: string
  sensorName!: string
  sensorValue!: boolean
  symbolForUrl!: string
  information!: string
  blockNotifications!: boolean
  blockSound!: boolean
}

export class BekidanFillerItemSetting{
  machineName!: string
  ipAddress!: string
  blockNotifications!: boolean
  blockSound!: boolean

  connectedSensors!: [ConnectedSensors]
}
