const { MongoClient } = require("mongodb");
const url="mongodb://prenotafacile:KyY6v3unfCnvS4ofNWO7Txzz23J0aTcK3709XWf8CCyZDnP1GkgWMmHVLBAOYDeQOts8OT6lnzGJWSb5Ir8b2A==@prenotafacile.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@prenotafacile@"
const client = new MongoClient(url);

module.exports = async function (context, req) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Users");
    await collection.findOneAndUpdate({username:req.query.username},{$set:{confirmed:true}});
    
     context.res = {
      status: 200
    };
  
    return context.res
}