//Base interface for all services that caches data
module Services {
    'use strict';

    export interface ICacheService<T> {
        //Cache content
        Data:T;

        //Cache retrieve and invalidate methods
        InvalidateCache():void;
        LoadData(argument:any):void;
        LoadDataCompleted(data:T, errorsModel:any):void;
    }
}
