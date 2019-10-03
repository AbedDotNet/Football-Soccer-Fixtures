import { Competition } from './models/competition';
import { IAppConfig } from './IAppConfig';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FootballServiceService {

  private jsonFile = '../assets/config.json';
  private competitionsJsonFile = '../assets/competitions.json';
  private configurations: IAppConfig;

  constructor(private httpClient: HttpClient) {
    this.getConfigurations();
  }

  private async getConfigurations(): Promise<IAppConfig> {

    await this.httpClient.get<IAppConfig>(this.jsonFile).toPromise().then(value => {
          this.configurations = value;
        });
    return this.configurations;
  }

  private async getBaseUrl() {

    const config = await this.getConfigurations();

    if (config === null){
      throw new Error('No baseurl found');
    }

    console.log('BaseUrl: ' + config.BaseUrl);

    return config.BaseUrl;
  }

  private async createAuthorizationHeader(): Promise<HttpHeaders> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', await this.getApiKey());
    return headers;
  }

  private async getApiKey(): Promise<string> {
    const config = await this.getConfigurations();

    if (config.ApiKey === null) {
      throw new Error('No apikey found');
    }

    console.log('ApiKey' + config.ApiKey);

    return config.ApiKey;
  }

  private async getCompetitionsUrl() {

    const config = await this.getConfigurations();
    const endpoint = `${config.BaseUrl}${config.GetCompetitionsUrl}`;

    if (config.GetCompetitionsUrl === null || endpoint === null) {
      throw new Error(`url couldn't be constructed`);
    }

    return endpoint;
  }

  public async getCompetitions(): Promise<Observable<Competition[]>> {
    const config = await this.getCompetitionsUrl();
    const httpHeaders = await this.createAuthorizationHeader();

    return await this.httpClient.get<Competition[]>(this.competitionsJsonFile, { headers: httpHeaders});
  }
}
