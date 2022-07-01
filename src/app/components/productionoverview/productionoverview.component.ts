import { Component, OnInit } from '@angular/core';
import { ProductionOverview } from 'src/app/models/ProductionOverview';

@Component({
  selector: 'app-productionoverview',
  templateUrl: './productionoverview.component.html',
  styleUrls: ['./productionoverview.component.css']
})
export class ProductionoverviewComponent implements OnInit {
  private urlForApi = "https://api.cloudkwekerijbloemendaal.com/api/ProductionOverview/"

  public ProductionLines: Array<ProductionOverview> = [];

  elems = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
  ];

  headers = ["Soort naam", "Hoeveelheid"];

  rows = [
    {
      "ID" : "1",
      "Name" : "Rahul",
      "Age" : "21",
      "Gender" : "Male",
      "Country" : "India"
    },
    {
      "ID" : "2",
      "Name" : "Ajay",
      "Age" : "25",
      "Gender" : "Male",
      "Country" : "India"
    },
  ]

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.DataCall();
  }

  _displayItems(data: [ProductionOverview]) {
    data.forEach((item: ProductionOverview) => {
      this.ProductionLines.push(Object.assign(new ProductionOverview(), item))
    });
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }

}
