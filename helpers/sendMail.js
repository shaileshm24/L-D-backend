import {createTransport } from 'nodemailer';
import hogan from 'hogan.js';
import fs from 'fs';
import {config} from '../config/config'
import jwt from 'jsonwebtoken';

const transporter = createTransport({
    
    host : 'smtp.gmail.com',
    port :'587',
    secure:false,
    auth:{
        user: config.gmailUser,
        pass:config.gmailPass
    }
});
//console.log("gmail user name===========",config.gmailUser)

const sendMailPromise = (mailOptions) =>{
    console.log('sendMailPromise');
   // console.log(mailOptions);
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) =>
      {
          console.log('mail sending...');
        if (error) {
          resolve('pending');
        } 
        else {
          console.log(`Email sent==> ${info.response}`);
          resolve('sent');
        }
      });
    });
  }

const mail = async (event, mailData) =>{

    let path=`.//views//`+event+'.ejs';
    let template=fs.readFileSync(path,'utf-8');
    let compiledTemplate=hogan.compile(template);
    let mailOptions
    let receiver =mailData.email
    console.log("User mail data", mailData);
    switch(event)
    {
      //mail to request documents
      case 'userSignup':
        console.log("mail data",mailData);
        receiver=mailData.email;
       // copy=mailData.;
        mailOptions = { to: receiver,
         // cc:copy+','+team,
          subject:'Welcome to Suyog Vivah',
          html:compiledTemplate.render({'firstName':mailData.firstName
            })
          };
        mailOptions.name=mailData.firstName;
        // data.trip_data[0].return=return_date;
        // mailOptions.date=data.trip_data[0];
      break;
      case 'activateUser':
        console.log("mail data",mailData);
        receiver=mailData.email;
        const token = jwt.sign({ email: mailData.email, password: mailData.password }, process.env.ACTIVATE_KEY, { expiresIn: '1d' })
        mailOptions = { to: receiver,
          subject:'Activate your account',
          html:`Please confirm your email address by clicking on give link. <a href=${config.serverLink}${token}>${config.serverLink}${token} </a>`//compiledTemplate.render({'token':config.serverLink+token})
          };
        mailOptions.name=mailData.firstName;
        // data.trip_data[0].return=return_date;
        // mailOptions.date=data.trip_data[0];
      break;
    }
    mailOptions.from = 'shaileshmali97@gmail.com';
    const mailResult = await sendMailPromise(mailOptions);
} 

export default mail;