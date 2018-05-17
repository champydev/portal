import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tryParse } from 'selenium-webdriver/http';
import { Subject } from 'rxjs';
@Injectable()
export class AccountService {

    private loggedStateChange = new Subject<boolean>();
    private _token: string = null;
    private _autoRefreshTimer = null;
    private _baseApiUrl: string = 'http://localhost:4000/';
    constructor(private http: HttpClient) {

    }

    public async forgot(email : string)
    {
        return new Promise<void>((resolve, reject) => {            
            this.http.post(this._baseApiUrl + 'api/account/forgot', {
                email:email
            }).subscribe((data) => {                
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
    public getToken(): string {
        return this._token;
    }

    public async refreshToken(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this._token == null) {
                reject('No active token');
            }
            this.http.post(this._baseApiUrl + 'api/account/refresh', {}).subscribe((data) => {
                this._token = (<any>data).token;
                resolve();
            }, (error) => {
                reject(error);
            });
        });

    }
    public stopAutoRefreshToken() {
        if (this._autoRefreshTimer != null) {
            clearInterval(this._autoRefreshTimer);
            this._autoRefreshTimer = null;
        }
    }

    public startAutoRefreshToken() {
        this.stopAutoRefreshToken();
        this._autoRefreshTimer = setInterval(async () => {
            try {
                await this.refreshToken();
            }
            catch (e) {
                this.stopAutoRefreshToken();
            }

        }, 50000);
    }
    public async signout() : Promise<void>
    {
        return new Promise<void>((resolve, reject) => {
            this.http.post(this._baseApiUrl + 'api/account/signout', {}).subscribe(
                (data) => {             
                    this.stopAutoRefreshToken();      
                    this._token =null;
                                    
                    resolve();
                }, (error) => {                    
                    if (error instanceof HttpErrorResponse) {
                        const httpError = <HttpErrorResponse>error;

                        if (httpError.status === 404) {
                            reject(new Error('API indisponible'));
                        }
                        else if (httpError.status === 406) {
                            reject(new Error('Mauvaise utilisation de l\'API'));
                        }
                        else if (httpError.status === 401) {
                            reject(new Error('Utilisateur inexistant'));
                        }
                        else if (httpError.status === 0) {
                            reject(new Error('Serveur indisponible'));
                        }
                        else {
                            reject(new Error(httpError.message));
                        }
                    }
                    else {

                        reject(error);
                    }

                });
        });
    }
    public async signin(email: string, hash: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            this.http.post(this._baseApiUrl + 'api/account/signin', {
                email: email,
                hash: hash
            }).subscribe(
                (data) => {                   
                    this._token = (<any>data).token;
                    this.startAutoRefreshToken();                   
                    resolve();
                }, (error) => {                    
                    if (error instanceof HttpErrorResponse) {
                        const httpError = <HttpErrorResponse>error;

                        if (httpError.status === 404) {
                            reject(new Error('API indisponible'));
                        }
                        else if (httpError.status === 406) {
                            reject(new Error('Mauvaise utilisation de l\'API'));
                        }
                        else if (httpError.status === 401) {
                            reject(new Error('Utilisateur inexistant'));
                        }
                        else if (httpError.status === 0) {
                            reject(new Error('Serveur indisponible'));
                        }
                        else {
                            reject(new Error(httpError.message));
                        }
                    }
                    else {

                        reject(error);
                    }

                });
        });


    }
}