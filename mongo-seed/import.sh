#! /bin/bash

mongoimport --host mongo --db expressmongo --collection users --type json --file /mongo-seed/initUsers.json --jsonArray;
mongoimport --host mongo --db expressmongo --collection usergridblocks --type json --file /mongo-seed/initUserBoards.json --jsonArray;
mongoimport --host mongo --db expressmongo --collection words --type json --file /mongo-seed/initWords.json --jsonArray;
mongoimport --host mongo --db expressmongo --collection wordlists --type json --file /mongo-seed/initWordLists.json --jsonArray;