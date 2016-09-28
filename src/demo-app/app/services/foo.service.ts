import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Foo } from "../models";
import { Observable } from "rxjs";
import { extractData } from "../utilities";

import { apiCofiguration } from "../configuration";


@Injectable()
export class FooService {
    constructor(private _http: Http) { }

    public add(entity: Foo) {
        return this._http
            .post(`${apiCofiguration.baseUrl}/api/foo/add`, entity)
            .map(data => data.json())
            .catch(err => {
                return Observable.of(false);
            });
    }

    public get() {
        return this._http
            .get(`${apiCofiguration.baseUrl}/api/foo/get`)
            .map(data => data.json())
            .catch(err => {
                return Observable.of(false);
            });
    }

    public getById(options: { id: number }) {
        return this._http
            .get(`${apiCofiguration.baseUrl}/api/foo/getById?id=${options.id}`)
            .map(data => data.json())
            .catch(err => {
                return Observable.of(false);
            });
    }

    public remove(options: { id: number }) {
        return this._http
            .delete(`${apiCofiguration.baseUrl}/api/foo/remove?id=${options.id}`)
            .map(data => data.json())
            .catch(err => {
                return Observable.of(false);
            });
    }

    public get baseUrl() { return apiCofiguration.baseUrl; }

}
