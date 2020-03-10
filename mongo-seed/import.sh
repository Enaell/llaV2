#! /bin/bash

mongoimport --host mongo --db expressmongo --collection users --type json --file /mongo-seed/initUsers.json --jsonArray;
mongoimport --host mongo --db expressmongo --collection usergridblocks --type json --file /mongo-seed/initUserBoards.json --jsonArray;