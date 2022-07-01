import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/services/LoggingService';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-popupwindow',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,

      })),
      state('closed', style({
        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
    ]),
  ],
  templateUrl: './popupwindow.component.html',
  styleUrls: ['./popupwindow.component.css'],
  providers: [LoggingService]
})
export class PopupwindowComponent implements OnInit {
  @Input() message: string = "";

  public isOpen = true;
  private counterOpen = 0;

  constructor(private loggingService: LoggingService,
    private settingsComponent:SettingsComponent) { }

  ngOnInit(): void {
  }

  onAnimationEventStart($event: any) {
  }

  onAnimationEventDone($event: any) {
    this.counterOpen++;
    if (this.counterOpen > 1)
      this.settingsComponent.ClosePopUp()
  }
  ClosePopUp(){
    this.isOpen = false;
    this.loggingService.logSomeMessage("dshuhdush")
  }
}
