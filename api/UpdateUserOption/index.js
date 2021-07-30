const { MongoClient } = require("mongodb");

const url="mongodb://prenotafacile:KyY6v3unfCnvS4ofNWO7Txzz23J0aTcK3709XWf8CCyZDnP1GkgWMmHVLBAOYDeQOts8OT6lnzGJWSb5Ir8b2A==@prenotafacile.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@prenotafacile@"
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