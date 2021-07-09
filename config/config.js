require('dotenv').config()
export const config ={

    dbHost : "localhost",
    dbPort:"27017",
    dbName : "Ametsa",
    serverPort: 3020 ,
    gmailUser : process.env.gmailUser,
    gmailPass: process.env.gmailPass,
    serverLink:"https://76730167394f.ngrok.io/verify-email/",
     
}