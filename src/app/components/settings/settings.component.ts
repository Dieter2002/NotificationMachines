import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationMachine } from '../../models/NotificationMachine';
import { ConnectedSensors } from '../../models/BekidanFillerItem';
import { SettingMachine } from '../../models/SettingMachine';
import { SettingdetailComponent } from 'src/app/components/settingdetail/settingdetail.component';
import { BarComponent } from 'src/app/components/bar/bar.component';
import { PopupwindowComponent } from '../popupwindow/popupwindow.component';

@Component({
  selector: 'app-settings',
  template: '<app-child [ActualMachine]="ActualMachine"></app-child>',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild(SettingdetailComponent) child: any;
  @ViewChild(PopupwindowComponent) popup: PopupwindowComponent | undefined;

  public ConnectedDevices: Array<SettingMachine> = [];

  public ActualMachine: SettingMachine = this.ConnectedDevices[0];
  public MessagePopUp = ""

  public showDetailWindow = false
  public showPopUp = false

  // private urlForApi = "https://api.cloudkwekerijbloemendaal.com/api/Settings/"
  private urlForApi = "https://localhost:13367/api/Settings/"
  // private urlForApi = "https://localhost:13367/api/Settings/"

  constructor(private router: Router,
    private http: HttpClient) {
   }

  async ngOnInit(): Promise<void> {
    await this.DataCall();
  }

  OpenDetails(item?: SettingMachine){
    if (item != null)
      this.ActualMachine = item
      this.showDetailWindow = true
  }

  CloseDetails(){
    this.showDetailWindow = false
  }

  ClosePopUp(){
    this.showPopUp = false
  }

  async SafeDetails(item?: SettingMachine){
    if (item == null)
      return;

    const machineName = document.getElementById('MachineName') as HTMLInputElement;
    const notiCheckBox = document.querySelector<HTMLInputElement>("input[name=notiCheckBox]");
    const soundCheckBox = document.querySelector<HTMLInputElement>("input[name=soundCheckBox]");

    if(this.CheckDeviceExist(machineName?.value)){
      this.MessagePopUp = "Item already axist"
      if (item.newCreated){
        this.showPopUp = true;
        return
      }
    }

    item.machineName = machineName?.value
    item.blockNotifications = notiCheckBox?.checked
    item.blockSound = soundCheckBox?.checked

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

  private CheckDeviceExist(item: string): boolean{
    return this.ConnectedDevices.some(x => x.machineName == item);
  }

  public RemoveDevice(item?: SettingMachine){
    if (item == null)
      return;

    this.http.delete(this.urlForApi+item.id)
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

  public AddDevice(){
    var setting = new SettingMachine(true);
    setting.connectedSensors.push(new ConnectedSensors)
    this.ActualMachine = setting
    this.showDetailWindow = true
  }

  public AddConnectedSensor(){
    this.ActualMachine.connectedSensors.push(new ConnectedSensors)
  }

  BackToHome(){
    this.router.navigateByUrl('');
  }

  _displayItems(data: [SettingMachine]) {
    data.forEach((item: SettingMachine) => {
      this.ConnectedDevices.push(Object.assign(new SettingMachine(false), item))
    });
  }

  DataPrepair(item: SettingMachine) : SettingMachine{
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

  async DataAdd(item: SettingMachine){
    const options = {headers: {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    var newItem = this.DataPrepair(item)

    this.http.post<SettingMachine>(this.urlForApi, JSON.stringify(newItem), options).subscribe(
    (t: SettingMachine) => {this.ConnectedDevices.push(newItem)});
  }

  async DataUpdate(item: SettingMachine){
    const options = {headers: {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    var newItem = this.DataPrepair(item)

    this.http.put<SettingMachine>(this.urlForApi+newItem.id, JSON.stringify(newItem), options).subscribe(
    (t: SettingMachine) => this.LogError(t));
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }

  LogError(item: SettingMachine){

  }
}


