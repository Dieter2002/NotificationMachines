import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationMachine } from '../hero-detail/hero-detail.component';
import { Settings, SettingsBase } from '../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public ConnectedDevices: Array<Settings> = [];

  public ActualMachine: Settings = this.ConnectedDevices[0];

  public showDetailWindow = false

  private urlForApi = "https://192.168.178.61:13367/api/Settings/"

  constructor(private router: Router,
    private http: HttpClient) {
   }

  async ngOnInit(): Promise<void> {
    await this.DataCall();
  }

  OpenDetails(item?: Settings){
    console.log(item?.id)
    if (item != null)
      this.ActualMachine = item
      this.showDetailWindow = true
  }

  CloseDetails(){
    this.showDetailWindow = false
  }

  async SafeDetails(){
    const input = document.getElementById('machinename') as HTMLInputElement;

    if(this.CheckDeviceExist(input?.value)){
      return
    }

    this.ActualMachine.machineName = input?.value

    // Update existing item
    console.log(this.ActualMachine)
    if(this.ActualMachine.id != ""){
      await this.DataUpdate(this.ActualMachine)
      this.showDetailWindow = false
      return
    }

    this.showDetailWindow = false

    // Add new item
    await this.DataAdd(this.ActualMachine)
  }

  CheckDeviceExist(item: string): boolean{
    return this.ConnectedDevices.some(x => x.machineName == item);
  }

  RemoveDevice(){
    this.http.delete(this.urlForApi+this.ActualMachine.id)
    .subscribe({
        next: data => {
          this.showDetailWindow = false
          this.ConnectedDevices.forEach((element, index) => {
            if (element.id === this.ActualMachine.id) this.ConnectedDevices.splice(index, 1);
          });
        },
        error: error => {
            console.error('There was an error!');
        }
    });
  }

  AddDevice(){
    this.ActualMachine = new Settings();
    this.showDetailWindow = true
  }

  BackToHome(){
    this.router.navigateByUrl('');
  }

  _displayItems(data: [Settings]) {
    data.forEach((item: Settings) => {
      this.ConnectedDevices.push(Object.assign(new Settings(), item))
    });
  }

  async DataAdd(item: Settings){
    const options = {headers: {      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    this.http.post<Settings>(this.urlForApi, JSON.stringify(item), options).subscribe(
    (t: Settings) => this.ConnectedDevices.push(t));
  }

  async DataUpdate(item: Settings){
    const options = {headers: {      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    this.http.put<Settings>(this.urlForApi+item.id, JSON.stringify(item), options).subscribe(
    (t: Settings) => console.log(t));
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }
}


