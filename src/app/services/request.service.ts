import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Client} from '../models/client';

@Injectable()
export class RequestService{
    public url: string;

    constructor(private _http:Http){
        this.url = "http://localhost:3977/"; //Url por defecto
    }

    getArticulos(){
        return this._http.get(this.url)
                            .pipe(map(res => res.json()));
    }

    getUserByDni(dni){
        return this._http.get(this.url+'search-dni/'+dni)
        .pipe(map(res => res.json()));
    }

    getUserByEmail(email){
        return this._http.get(this.url+'search-email/'+email)
        .pipe(map(res => res.json()));
    }

    addOrUpdateClient(client: Client){
        let json = JSON.stringify(client);
        let params = '';
        for(let prop in client){
            params+=prop+'='+client[prop]+'&';
        }
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'save-client', params, {headers: headers})
                        .pipe(map(res => res.json()));
    }
}
