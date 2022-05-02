export class SensorValueDescriptionTF{
  value: boolean = false
  valueTrue: string = ""
  valueFalse: string = ""
}

export interface BekidanFillerItem{
  machineName: string
  ipAddress: string
  sensorValue: boolean
  // values: SensorValueDescriptionTF
}
