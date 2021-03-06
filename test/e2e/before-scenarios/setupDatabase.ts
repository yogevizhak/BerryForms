declare var require:any;
declare var process:any;

//Modules
var ConfigServer:any = require('../../../server/config/Config').Config.Server;
var MongoClientObject:any = require('mongodb').MongoClient;
var MongoServerObject:any = require('mongodb').Server;

var MongoServerInstance:any = new MongoServerObject(ConfigServer.MongoServerUri, ConfigServer.MongoServerPort);
var MongoClientInstance:any = new MongoClientObject(MongoServerInstance);

module E2EBeforeScenarios {
    'use strict';

    export class MongoDatabase {
        public static Setup():void {
            MongoClientInstance.open(function (err:any, MongoClientLocal:any):void {
                if (err) {
                    console.log('Could not establish connection to Mongo database ' + ConfigServer.MongoServerUri);
                    process.exit(99);
                    return;
                }

                var databaseName:string = 'e2e_' + ConfigServer.BerryFormsDatabaseName;
                console.log('Connected to Mongo database ' + ConfigServer.MongoServerUri);
                var db:any = MongoClientLocal.db(databaseName);
                db.dropDatabase();
                console.log('Dropped database ' + databaseName);
                process.exit(0);
            });
        }
    }
}

E2EBeforeScenarios.MongoDatabase.Setup();
