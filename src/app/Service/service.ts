import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfigService {
  configUrl = 'https://localhost:7283/api/BekidanFillerItemsapi/todoitems';

  constructor(private http: HttpClient) {

  }

  getConfig() {
    return this.http.get<Config>(this.configUrl, );
  }
}

export interface Config {
  heroesUrl: [Machines]
}

export interface Machines{
  MachineNaam: string;
  SensorValue: string;
}





