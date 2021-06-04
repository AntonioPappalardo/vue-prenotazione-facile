const { v4: uuidv4, stringify } = require("uuid");
const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
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