const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
const client = new MongoClient(url);
module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Users");
    
    const filter={
        username:req.query.user,
    }
    const updateDoc={
        $set:{
            notification:req.query.notification,
            service:req.query.service
        }
    }
        await collection.findOneAndUpdate(filter,updateDoc);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        status:200
    };
    return context.res

}