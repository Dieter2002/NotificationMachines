import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  private _yourComponentNameLoadedAlready :boolean = false;

  constructor() { }


  public set YourComponentNameLoadedAlready(v : boolean) {
    this._yourComponentNameLoadedAlready= v;
  }

  public get YourComponentNameLoadedAlready() : boolean {
    return this._yourComponentNameLoadedAlready;
  }


}
