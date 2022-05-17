import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationMachine } from '../../models/NotificationMachine';
import { ConnectedSensors } from '../../models/BekidanFillerItem';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public ConnectedDevices: Array<Settings> = [];

  public ActualMachine: Settings = this.ConnectedDevices[0];

  public showDetailWindow = false

  private urlForApi = "https://api.cloudkwekerijbloemendaal.com/api/Settings/"
  // private urlForApi = "https://localhost:13367/api/Settings/"

  constructor(private router: Router,
    private http: HttpClient) {
   }

  async ngOnInit(): Promise<void> {
    await this.DataCall();
  }

  OpenDetails(item?: Settings){
    if (item != null)
      this.ActualMachine = item
      this.showDetailWindow = true
  }

  CloseDetails(){
    this.showDetailWindow = false
  }

  async SafeDetails(){
    const machineName = document.getElementById('MachineName') as HTMLInputElement;
    const notiCheckBox = document.querySelector<HTMLInputElement>("input[name=notiCheckBox]");
    const soundCheckBox = document.querySelector<HTMLInputElement>("input[name=soundCheckBox]");

    // if(this.CheckDeviceExist(input?.value)){
    //   this.showDetailWindow = false
    //   return
    // }

    this.ActualMachine.machineName = machineName?.value
    this.ActualMachine.blockNotifications = notiCheckBox?.checked
    this.ActualMachine.blockSound = soundCheckBox?.checked

    // Update existing item
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
    var setting = new Settings();
    setting.connectedSensors.push(new ConnectedSensors)
    this.ActualMachine = setting
    this.showDetailWindow = true
  }

  AddConnectedSensor(){
    this.ActualMachine.connectedSensors.push(new ConnectedSensors)
  }

  BackToHome(){
    this.router.navigateByUrl('');
  }

  _displayItems(data: [Settings]) {
    data.forEach((item: Settings) => {
      this.ConnectedDevices.push(Object.assign(new Settings(), item))
    });
  }

  DataPrepair(item: Settings) : Settings{
    var listInputs = ["SensorName", "SymbolForUrl", "ValueTrue", "ValueFalse"]

    var sensorNames = document.querySelectorAll<HTMLInputElement>("input[name="+listInputs[0]+"]");
    var symbolForUrl = document.querySelectorAll<HTMLInputElement>("input[id="+listInputs[1]+"]");
    var valueTrue = document.querySelectorAll<HTMLInputElement>("input[id="+listInputs[2]+"]");
    var valueFalse = document.querySelectorAll<HTMLInputElement>("input[id="+listInputs[3]+"]");

    var newConnectedSensors = Array<ConnectedSensors>();

    for (var i = 0;  i < item.connectedSensors.length; i++){
      newConnectedSensors.push(new ConnectedSensors(
        item.machineName + "." + sensorNames[i]?.value,
        sensorNames[i]?.value,
        symbolForUrl[i]?.value,
        valueTrue[i]?.value,
        valueFalse[i]?.value,))
    }

    item.connectedSensors = newConnectedSensors
    return item
  }

  async DataAdd(item: Settings){
    const options = {headers: {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    var newItem = this.DataPrepair(item)

    this.http.post<Settings>(this.urlForApi, JSON.stringify(newItem), options).subscribe(
    (t: Settings) => {this.ConnectedDevices.push(newItem)});
  }

  async DataUpdate(item: Settings){
    const options = {headers: {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    var newItem = this.DataPrepair(item)

    this.http.put<Settings>(this.urlForApi+newItem.id, JSON.stringify(newItem), options).subscribe(
    (t: Settings) => console.log(t));
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }
}


