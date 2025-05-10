import { Injectable } from '@angular/core';
import {BaseCrudApiService} from './base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService extends BaseCrudApiService {
  ServiceUrl: string = 'v1/WeatherForecast/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetWeather(){
    return this.get(this.ServiceUrl + 'GetWeather', null, null);
  }
}
