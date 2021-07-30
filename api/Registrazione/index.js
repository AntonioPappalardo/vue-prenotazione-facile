const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

const url="mongodb://prenotafacile:KyY6v3unfCnvS4ofNWO7Txzz23J0aTcK3709XWf8CCyZDnP1GkgWMmHVLBAOYDeQOts8OT6lnzGJWSb5Ir8b2A==@prenotafacile.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@prenotafacile@"
const client = new MongoClient(url);
module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Users");
    let data = { _id: uuidv4(),
    "username":req.query.username,
    "password":req.query.password,
    "type":req.query.type,
    "notification":req.query.notification,
    "service":req.query.service,
    "confirmed":false,
    "code":req.query.code
    };
    await collection.insertOne(data);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}