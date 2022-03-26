import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  // ...
} from '@angular/animations';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Config, ConfigService } from '../Service/service';

export const fadeAnimation = trigger('popOverState', [
  transition(':enter', [
    style({ opacity: 0, }), animate('300ms', style({ opacity: 1 }))
  ]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

// const listAnimation = trigger('listAnimation', [
//   transition('* <=> *', [
//     query(':enter',
//       [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
//       { optional: true }
//     ),
//     query(':leave',
//       animate('200ms', style({ opacity: 0 })),
//       { optional: true }
//     )
//   ])
// ]);

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [
    // trigger('popOverState', [
    //   state('show', style({
    //     height: '200px',
    //     opacity: 0,
    //     // transition: 'translateY(100)'
    //   })),
    //   state('hide',   style({
    //     height: '0px',
    //     opacity: 1,
    //     // transition: 'translatex(-100)'
    //   })),
    //   transition('show => hide', animate('2000ms ease-out')),
    //   transition('hide => show', animate('2000ms ease-in'))
    // ]),
    // trigger('popOverState', [
    //   transition(':enter', [
    //     style({ opacity: 0, }), animate('300ms', style({ opacity: 1 }))
    //   ]
    //   ),
    //   transition(':leave',
    //     [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
    //   )
    // ]),
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
  // animations: [
  //   // trigger('popOverState', [fadeAnimation]),
  //   trigger('listAnimation', [listAnimation])

  // ]

})



export class HeroDetailComponent implements OnInit {
  title = "WELKOM";

  show = false;

  public notifications: [Notification];
  // public configService;
  // config: Config | undefined;
  // public http: HttpClient;
  totalAngularPackages: any;

  constructor(private http: HttpClient) {
    let no = new Notification("", "Bekidan trayaanvuller voor", "De trays zijn weer bijgevuld", "critic");
    let no1 = new Notification("check-circle", "Bekidan trayaanvuller achter", "De trays zijn zijn weer bijgevuld", "fixed");
    let no5 = new Notification("check-circle", "Bekidan trayaanvuller voor", "De trays zijn zijn weer bijgevuld", "fixed");
    let no2 = new Notification("exclamation-triangle", "Grondvulmachine", "De grond is op", "critic");
    let no3 = new Notification("exclamation-triangle", "Aanvoerband", "Ontstopping bij Bekidan tray aanvuller voor", "critic");
    // let no4 = new Notification("exclamation-triangle", "Bufferband", "Band staat vol", "warning");
    no.visible = false;
    this.notifications = [no];
    this.notifications.push(no1, no2, no3);
    // this.http: HttpClient;

    // this.configService = new ConfigService(http);

  }

  get stateName() {
    // console.log(this.show);
    return this.show ? 'show' : 'hide'
  }

  ngOnInit() {
    this.AddNotificationsToStack();
  }

  toggle() {
    this.show = !this.show;
  }

  AddNotificationsToStack() {
    console.log("HELLO");
  }

  NotiToFixed() {
    console.log("HELLO");
  }

  CheeseBurger() {
    console.log("HELLO");
    this.AddToStack(new Notification("exclamation-triangle", "Barkmachine", "De bark is op", "critic"));


  }
  CheeseBurger2() {
    console.log("HELLO");
    // this.AddToStack(new Notification("HAHAA"));


  }
  CheeseBurger3() {
    const app = document.getElementById("app");

    app!.style!.color = "red";
  }

  _displayItems(data: Machines[]) {

    data.forEach((item: any) => {
      // console.log(item.ID);
      // console.log(item.MachineNaam);
      // console.log(item.SensorValue);

      let kaas = item;

      console.log(kaas);

    });

  }

  async DataCall() {
    await fetch('https://localhost:7283/api/BekidanFillerItems')
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
  }

  Kaas(noti: Notification) {
    this.notifications.forEach((item, index) => {
      if (item === noti) this.notifications.splice(index, 1);
    });

    // this.notifications.forEach((item, index) => {
    //   if (item === noti) item.type = "fixed";
    // });
  }

  SetNotificationDone(noti: Notification) {
    let no = noti;
    no.type = "white";
  }

  AddToStack(noti: Notification) {
    this.notifications.push(noti);
  }
}

export interface Machines{
  MachineNaam: string;
  SensorValue: string;
}

export class Notification {
  id: number;
  icon: string;
  machine: string;
  message: string;
  type?: string;
  visible?: boolean;

  constructor(icon: string, machine: string, message: string, type: string) {
    this.id = 0;
    this.icon = icon;
    this.machine = machine;
    this.message = message;
    this.type = type;
    this.visible = true;
  }
}

