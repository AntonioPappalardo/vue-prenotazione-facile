var nodemailer = require('nodemailer');
module.exports = async function (context, req) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prenotazionifacili@gmail.com', // your GMail email address 
            pass: 'CloudComputing2021' // your Gmail password
        }
    });
    const email=req.query.email
    const subject=req.query.subject
    const object =req.query.object;
    const mailOptions = {
        from: 'prenotazionifacili@gmail.com',
        to: email,
        subject: subject,
        text: object,
    };
    await transporter.sendMail(mailOptions);
}