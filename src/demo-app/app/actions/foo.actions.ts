import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { FooService } from "../services";
import { AppState, AppStore } from "../store";
import { FOO_ADD_SUCCESS, FOO_GET_SUCCESS, FOO_REMOVE_SUCCESS } from "../constants";
import { Foo } from "../models";
import { Observable } from "rxjs";
import { guid } from "../utilities";

@Injectable()
export class FooActions {
    constructor(private _fooService: FooService, private _store: AppStore) { }

    public add(foo: Foo) {
        const newGuid = guid();
        this._fooService.add(foo)
            .subscribe(foo => {
                this._store.dispatch({
                    type: FOO_ADD_SUCCESS,
                    payload: foo
                },newGuid);                
            });
        return newGuid;
    }

    public get() {                          
        return this._fooService.get()
            .subscribe(foos => {
                this._store.dispatch({
                    type: FOO_GET_SUCCESS,
                    payload: foos
                });
                return true;
            });
    }

    public remove(options: {id: number}) {
        return this._fooService.remove({ id: options.id })
            .subscribe(foo => {
                this._store.dispatch({
                    type: FOO_REMOVE_SUCCESS,
                    payload: options.id
                });
                return true;
            });
    }

    public getById(options: { id: number }) {
        return this._fooService.getById({ id: options.id })
            .subscribe(foo => {
                this._store.dispatch({
                    type: FOO_GET_SUCCESS,
                    payload: [foo]
                });
                return true;
            });
    }
}
