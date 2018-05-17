import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AccountService {

    constructor(private http: HttpClient) {

    }
    public async signin(email: string, hash: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            this.http.post('http://localhost:3000/api/account/signin', {
                email: email,
                hash: hash
            }).subscribe(
                (data) => {
                    resolve();
                }, (error) => {
                    if (error instanceof HttpErrorResponse) {
                        const httpError = <HttpErrorResponse>error;

                        if (httpError.status === 404) {
                            reject(new Error('API indisponible'));
                        }
                        if (httpError.status === 0) {
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