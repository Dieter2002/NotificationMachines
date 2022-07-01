import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingMachine } from 'src/app/models/SettingMachine';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-settingdetail',
  templateUrl: './settingdetail.component.html',
  styleUrls: ['./settingdetail.component.css']
})
export class SettingdetailComponent implements OnInit {
  public ConnectedDevices: Array<SettingMachine> = [];

  @Input() machine: SettingMachine | undefined;

  public showDetailWindow = true;

  constructor(private settingsComponent:SettingsComponent) { }

  ngOnInit(): void {
  }

  AddConnectedSensor(item?: SettingMachine){
    this.settingsComponent.AddConnectedSensor()
  }
  SafeDetails(item?: SettingMachine){
    this.settingsComponent.SafeDetails(item)

  }
  RemoveDevice(item?: SettingMachine){
    this.settingsComponent.RemoveDevice(item)
  }
  CloseDetails(){
    this.settingsComponent.CloseDetails()

  }
}
