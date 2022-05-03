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
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { BekidanFillerItem } from '../models/BekidanFillerItem';
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
  seconds = 3;

  public notifications!: [NotificationMachine];

  constructor(private router: Router) {
    let no: NotificationMachine = new NotificationMachine("critic", "f", "fds", "critic")
    this.notifications = [(no)]
    no.visible = false

    var timerr = timer(0,5000);
    timerr.subscribe(any => this.DataCall());
  }

  get stateName() {
    // console.log(this.show);
    return this.show ? 'show' : 'hide'
  }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

  CheeseBurger3() {
    document.getElementById("app")!.style!.color = "red";
  }

  _displayItems(data: [BekidanFillerItem]) {
    if (data.length < 1){
      this.notifications.splice(0);
    }

    data.forEach((item: any) => {
      let newTodo: BekidanFillerItem = Object.assign(new BekidanFillerItem(), item)
      // let newTodo: BekidanFillerItem = item
      // let newTodo: JSON.parse(item)

      // let jsonObject = item.json() as Object;
      // let fooInstance = plainToClass(Models.Foo, jsonObject);

      if(!this.notifications.some(x => x.machine === newTodo.machineName)){
        var not = new NotificationMachine("exclamation-triangle", newTodo.machineName, "De grond is op", "critic");
        if (!newTodo.description[0].sensorValue){
          this.notifications.push(not);
        }
        else{
          this.notifications.forEach((item, index) => {
            if (item.machine === newTodo.machineName) this.notifications.splice(index, 1);
          });
        }

      }
      else{
        this.notifications.forEach((item, index) => {
          if (item.machine === newTodo.machineName) {
            this.notifications.forEach((item, index) => {
              if (item.type === "fixed") this.notifications.splice(index, 1);
            });
            if (newTodo.description[0].sensorValue)
              this.SetNotificationDone(item);
          }
        });
      }
    });
  }

  test(){

  }

  OpenSetting(){
    this.router.navigateByUrl('/settings');
  }

  async DataCall() {
    await fetch('https://192.168.178.61:13367/api/BekidanFillerItems')
      .then(response => response.json())
      .then(data => this._displayItems(data))
      .catch(error => console.error('Unable to get items.', error));
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
  }

  AddToStack(noti: NotificationMachine) {
    this.notifications.push(noti);
  }
}

/** This NotificationMachine API interface is used to configure and display desktop notifications to the user. */
export class NotificationMachine {
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



