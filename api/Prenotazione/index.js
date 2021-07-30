const { v4: uuidv4, stringify } = require("uuid");
const { MongoClient } = require("mongodb");

const url="mongodb://prenotafacile:KyY6v3unfCnvS4ofNWO7Txzz23J0aTcK3709XWf8CCyZDnP1GkgWMmHVLBAOYDeQOts8OT6lnzGJWSb5Ir8b2A==@prenotafacile.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@prenotafacile@"
const client = new MongoClient(url);
module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Prenotazioni");
    let data = { _id: uuidv4(),
    "id":req.query.id,
    "luogo":req.query.luogo,
    "data":req.query.data,
    "intervallo":req.query.intervallo,
    "username":req.query.username,
    "orario":req.query.orario
    };
    await collection.insertOne(data);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}