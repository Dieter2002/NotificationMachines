import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  public mobileDetected = true;
  public showBar = true;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.CheckDevice(window.innerWidth)
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.mobileDetected){
      this.showBar = false;
    }
    this.CheckDevice(window.innerWidth)
  }

  CheckDevice(width: number){
    if(width < 600){
        this.mobileDetected = true;
    }
    else{
      this.mobileDetected = false;
      this.showBar = true
    }

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    }
  }

  HideShowBar(){
    this.showBar = !this.showBar;
  }

  BackToHome(){
    this.router.navigateByUrl('');
  }

  NavToSettings(){
    this.router.navigateByUrl('settings');
  }

  NavToImages(){
    this.router.navigateByUrl('images');
  }

  NavToTest(){
    this.router.navigateByUrl('test');
  }

  NavToProductionOverview(){
    this.router.navigateByUrl('productionoverview');
  }



}
