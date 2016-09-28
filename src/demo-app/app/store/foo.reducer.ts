import { Action } from "@ngrx/store";
import { FOO_ADD_SUCCESS, FOO_GET_SUCCESS, FOO_REMOVE_SUCCESS } from "../constants";
import { initialState } from "./initial-state";
import { AppState } from "./app-state";
import { Foo } from "../models";
import { addOrUpdate, pluckOut } from "../utilities";

export const foosReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case FOO_ADD_SUCCESS:
            var entities: Array<Foo> = state.foos;
            var entity: Foo = action.payload;
            addOrUpdate({ items: entities, item: entity});            
            return Object.assign({}, state, { foos: entities });

        case FOO_GET_SUCCESS:
            var entities: Array<Foo> = state.foos;
            var newOrExistingFoos: Array<Foo> = action.payload;
            for (let i = 0; i < newOrExistingFoos.length; i++) {
                addOrUpdate({ items: entities, item: newOrExistingFoos[i] });
            }                                    
            return Object.assign({}, state, { foos: entities });

        case FOO_REMOVE_SUCCESS:
            var entities: Array<Foo> = state.foos;
            var id = action.payload;
            pluckOut({ value: id, items: entities });
            return Object.assign({}, state, { foos: entities });

        default:
            return state;
    }
}

