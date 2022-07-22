import { Component, OnInit } from '@angular/core';
import { ProductionOverviewPerDay } from 'src/app/models/ProductionOverviewPerDay';

@Component({
  selector: 'app-productionoverview',
  templateUrl: './productionoverview.component.html',
  styleUrls: ['./productionoverview.component.css']
})
export class ProductionoverviewComponent implements OnInit {
  // private urlForApi = "https://api.cloudkwekerijbloemendaal.com/api/ProductionOverview/"
  private urlForApi = "https://localhost:13367/api/ProductionOverview/"

  public ProductionLines: Array<ProductionOverviewPerDay> = [];
  public AvailableYears: Array<number> = [2020, 2021]
  private ChosenYear: number = 2022;

  public selectedDevice: any;
  public refreshProduction: boolean = false
  public openDetail: boolean = false

  headers = ["Soort naam", "Hoeveelheid (in trays)", "Tijd"];

  constructor() {
    let timerId = setInterval(() => this.UpdateProductionOverview(), 5000);
  }

  GetProductionOverview(): Array<ProductionOverviewPerDay>{
    return this.ProductionLines
  }

  GetProductionYears() : Array<number>{
    var allFoundYears = this.ProductionLines.map(x => x.timeStampStart.getFullYear())
    var allUniqueYears = Array.from(new Set(allFoundYears))
    return allUniqueYears
  }

  SetChosenYear(item: number){
    this.ChosenYear = item
    console.log(item)
  }

  onChangeSelect(deviceValue: any) {
    const target = deviceValue.target.value as HTMLTextAreaElement;
    this.ChosenYear = target as unknown as number
  }

  OpenDetail(deviceValue: ProductionOverviewPerDay) {
    console.log(deviceValue)
    this.openDetail = !this.openDetail
  }

  onChangeSwitch(deviceValue: any) {
    this.refreshProduction = !this.refreshProduction
  }

  setTimeFormat(dateTime: Date) : string{
    return dateTime.getMonth() + "-" + dateTime.getDay() + " " + dateTime.getHours() + ":" + dateTime.getMinutes()
  }

  async ngOnInit(): Promise<void> {
    await this.DataCall();
  }

  UpdateProductionOverview(){
    if (this.refreshProduction){
      this.DataCall()
    }
  }

  _displayItems(data: [ProductionOverviewPerDay]) {
    this.ProductionLines = []

    data.forEach((item: ProductionOverviewPerDay) => {
      const prodItem = Object.assign( new ProductionOverviewPerDay(), {
        id: item.id,
        idProd: item.id,
        timeStampStart: new Date(item.timeStampStart),
        timeStampStop: new Date(item.timeStampStop),
        typeName: item.typeName,
        quantityTrays: item.quantityTrays,
      });

      this.ProductionLines.push(Object.assign(new ProductionOverviewPerDay(), prodItem))
    });
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }

}
