import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BekidanFillerItem } from '../../models/BekidanFillerItem';
import { NotificationMachine } from '../../models/NotificationMachine';
import { GlobalSettingsService } from 'src/app/services/services';

export const fadeAnimation = trigger('popOverState', [
  transition(':enter', [
    style({ opacity: 0, }), animate('300ms', style({ opacity: 1 }))
  ]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),
      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({ transform: 'translateX(+100%)' })))
    ])
  ],
})

export class HeroDetailComponent implements OnInit {
  show = false;
  seconds = 3;

  public showBar = false;

  public notifications!: Array<NotificationMachine>;

  // private urlForApi = "https://localhost:13367/api/MachineItems/"
  private urlForApi = "https://api.cloudkwekerijbloemendaal.com/api/MachineItems/"
  public soundPlaying = false
  private lastTimeCall = 0

  constructor(private router: Router,
    private http: HttpClient,
    private globalSettingsService:GlobalSettingsService) {
    let no: NotificationMachine = new NotificationMachine("exclamation-triangle", "", "", "", false, "", "",  "critic")
    this.notifications = [(no)]
    no.visible = false

    let timerId = setInterval(() => this.DataCall(), 5000);
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  ngOnInit() {
    if(this.globalSettingsService.YourComponentNameLoadedAlready){
      this.globalSettingsService.YourComponentNameLoadedAlready=true;
    }

    this.lastTimeCall = Date.now() / 1000;
    this.DataCall()
  }

  HideShowBar(){
    this.showBar = !this.showBar;
  }

  toggle() {
    this.show = !this.show;
  }

  CheeseBurger3() {
    document.getElementById("app")!.style!.color = "red";
  }

  RemoveAllNotifications(){
    this.notifications = []
    this.DataRemove();
  }

  _displayItems(data: [BekidanFillerItem]) {
    if ((Date.now() / 1000) + 50000 > this.lastTimeCall ){
      this.lastTimeCall = Date.now() / 1000
      console.log(this.lastTimeCall)
    }
    else{
      return
    }

    if (data.length < 1){
      this.notifications.splice(0);
    }

    var itemAdded = false

    data.forEach(async (item: any) => {
      let newTodo: BekidanFillerItem = Object.assign(new BekidanFillerItem(), item)

      if (newTodo.blockNotifications){
        return;
      }

      if(!this.notifications.some(x => x.machineSensorId === newTodo.machineSensorId)){
        var not = new NotificationMachine("exclamation-triangle", newTodo.machineName, newTodo.machineSensorId,
        newTodo.sensorName, newTodo.sensorValue, newTodo.information, newTodo.symbolForUrl, "critic");

        if (!newTodo.sensorValue){
          this.notifications.push(not);
          if (!newTodo.blockSound){
            itemAdded = true
          }
        }
      }
      else{
        this.notifications.forEach((item, index) => {
          if (item.machineSensorId === newTodo.machineSensorId) {
            if (item.type === "fixed") this.notifications.splice(index, 1);
            if (newTodo.sensorValue){
              item.message = newTodo.information
              item.fixed = newTodo.sensorValue
              this.SetNotificationDone(item);
            }
          }
        });
      }
    });
    // After all done, beep
    if (itemAdded){
      if (!this.soundPlaying){
          var audio = new Audio('https://storage.cloudkwekerijbloemendaal.com/Sounds/samsung-s10-spaceline-notification.mp3');
          audio.play();
      }
    }
  }

  HandleSoundSetting(oscillator: OscillatorNode){
    oscillator.stop()
  }

  OpenSetting(){
    this.router.navigateByUrl('/settings');
  }

  async DataCall() {
    await fetch(this.urlForApi)
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }

  async DataRemove(){
    const options = {headers: {"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    , 'Content-Type': 'application/json'}};

    this.http.delete(this.urlForApi,  options).subscribe();
  }

  HandleConnectionError(){

  }

  RemoveFromList(noti: NotificationMachine) {
    this.notifications.forEach((item, index) => {
      if (item === noti) this.notifications.splice(index, 1);
    });
  }

  SetNotificationDone(noti: NotificationMachine) {
    noti.type = "fixed";
    noti.icon = "check-circle";
  }

  AddToStack(noti: NotificationMachine) {
    this.notifications.push(noti);
  }
}





