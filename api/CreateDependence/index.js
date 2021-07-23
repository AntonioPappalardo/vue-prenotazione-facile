const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
const client = new MongoClient(url);
module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Dipendence");
    let data = { _id: uuidv4(),
    "username":req.query.user,
    "day":req.query.day,
    "luogo":req.query.luogo,
    "orario":req.query.orario,
    "active":true
    };
    await collection.insertOne(data);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}