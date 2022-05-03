export class ValuesDescription{
  sensorValue!: boolean
  valueTrue!: string
  valueFalse!: string
}

export class BekidanFillerItem{
  machineName!: string
  ipAddress!: string
  description!: [ValuesDescription]
}
