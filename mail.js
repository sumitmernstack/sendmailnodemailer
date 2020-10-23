const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL , 
        pass: process.env.PASSWORD ' 
    }
});
const sendMail = ( subject,email, text, filename,result) => {
    console.log(result);
    const mailOptions = {
        from: 'abc@gmail.com', 
        subject, 
        to: email,
        text,
        attachments:
         [
            { 
            filename: filename,
             path : result ,
            contentType: 'application/pdf' } 
        ],
        html : { path: './index.html' }

    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          return  console.log('error occured',err);
        }
        return  console.log('email sent', data);
    });
}

module.exports = sendMail;