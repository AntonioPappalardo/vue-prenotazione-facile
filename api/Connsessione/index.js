const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
const client = new MongoClient(url);

module.exports = async function (context, req) {
  await client.connect();
  const database = client.db("PrenotaFacile");
  var collection = database.collection("Users");
  var list = await collection.find({}).toArray();
  collection=database.collection("Prenotazioni");
  var preno=await collection.find({}).toArray();
  collection=database.collection("Luoghi");
  var luoghi=await collection.find({}).toArray();
   context.res = {
    status: 200,
    body: {"users":list,"prenotazioni":preno,"luoghi":luoghi},
  };
  return context.res
};
