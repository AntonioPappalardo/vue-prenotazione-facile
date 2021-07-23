
const { MongoClient } = require("mongodb");

const url = "mongodb://prenota-app:jDSeeqyjgJJc0Ew6RkoCpgtVMddcbATNjn72kn2wY5almzSqPVV6VBqQq5E8Qzh9B6SFpuxvJ0GowkgrA7kEHQ%3D%3D@prenota-app.mongo.cosmos.azure.com:10255/?ssl=true&appName=@prenota-app@";
const client = new MongoClient(url);
var nodemailer = require('nodemailer');

module.exports = async function (context, myTimer) {
    await client.connect();
    const database = client.db("PrenotaFacile");
    var collection = database.collection("Dipendence");
    var list = await collection.find({}).toArray();
    var today = new Date();
    
    var daymail=new Date(today);
    daymail.setDate(today.getDate()+3);
    var month= daymail.getMonth()+1<10 ? "0"+(daymail.getMonth()+1) : daymail.getMonth()+1
    var day= daymail.getDate()<10 ? "0"+daymail.getDate(): daymail.getDate()
    var data=""+daymail.getFullYear()+"-"+month+"-"+day
    
    listmail=list.filter(mailer=>((mailer.day===daymail.getDay())&&(mailer.active==false)))
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prenotazionifacili@gmail.com', // your GMail email address 
            pass: 'CloudComputing2021' // your Gmail password
        }
    });
    var users=await database.collection("Users").find({}).toArray();
    for (mail of listmail){
        user=users.find(us=>(us.username===mail.username))
        var email=user.username;
        if(user.type==1){
            email= email+"@studenti.unisa.it";
        }
        else{
            email= email+ "@unisa.it";
        }
        var emaila="antoniopappalardo1997@gmail.com"
        const subject="Prenotazione"
        const object ="Le ricordiamo"+email+" \nche ancora non ha effettuato la prenotazione per "+data+"\nla invitiamo,\nCordiali Saluti\nPrenotazioniFacili";
        const mailOptions = {
            from: 'prenotazionifacili@gmail.com',
            to: emaila,//Da sostituire con email
            subject: subject,
            text: object,
        };
        await transporter.sendMail(mailOptions);
        
    }
    //Elimino i disactive
    var query= { "day":today.getDay(), "active":false}
    await collection.deleteMany(query);

    //modifico gli active in disavtive
    var filter = {"day":today.getDay(), "active":true }
    var update = {
        $set:{
            active:false
        }
    }
    await collection.updateMany(filter,update)

};