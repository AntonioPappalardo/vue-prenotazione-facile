const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
const client = new MongoClient(url);
module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Dipendence");
    
    const filter={
        "username":req.query.user,
        "day":req.query.day,
        "luogo":req.query.luogo
    }
    const updateDoc={
        "$set":{
            "active":true
        }
    }
        await collection.findOneAndUpdate(filter,updateDoc);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}