import { Time } from "@angular/common";
import moment from "moment";
import { ConnectedSensors } from "./BekidanFillerItem";

export class ProductionOverviewPerDay{
  id: string = ""
  idProd: string = ""
  typeName: string = ""
  public timeStampStart: Date = new Date()
  public timeStampStop: Date = new Date()
  quantityTrays: number = 0
}
