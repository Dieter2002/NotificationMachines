import { Component, OnInit } from '@angular/core';
import { NotificationMachine } from '../../models/NotificationMachine';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public devices!: [NotificationMachine];

  constructor() {
  }

  ngOnInit(): void {
  }
}
