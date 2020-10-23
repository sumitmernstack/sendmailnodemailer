
const express = require('express');
const upload= require('express-fileupload');
const sendMail = require('./mail');
const app = express();
const PORT = 3000;

app.use(upload());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', (req, res) =>
{
  res.sendFile(__dirname + '/index.html');
}
);

app.post('/email',(req, res)=>
{
 //console.log(req.body);
 var file=req.files.file;
 var filename= file.name;
 //console.log(req.files);
  if(req.files)
  {
    //console.log(req.files);
    file.mv('./uploads/'+filename, function(err){
      if(err){
      return  res.send(err)
      }
      else{
      return   res.send('file upload')
      }
    })
    //console.log(filename);

        var str1 = filename;
    var str2 = './uploads/';
    var result = str2.concat(str1);
    const { subject, email, text} = req.body;

    console.log(subject,email,text);

    sendMail(subject, email, text, filename,result, function(err, data) {
      if (err) {
           res.status(500).json({ message:'internal error' });
      }
       res.json({ message: 'Email is sent' });
     }); 
  }
})

app.listen(PORT, () => console.log(`Server is starting on PORT ${PORT}`));