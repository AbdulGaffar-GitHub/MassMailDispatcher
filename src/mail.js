
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
   type: "OAuth2",
   user: process.env.EMAIL,
   pass: process.env.WORD,
   clientId: process.env.OAUTH_CLIENTID,
   clientSecret: process.env.OAUTH_CLIENT_SECRET,
   refreshToken: process.env.OAUTH_REFRESH_TOKEN,
 },
});

transporter.verify((err, success) => {
 err
   ? console.log(err)
   : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
let mailOptions = {
 from:process.env.EMAIL,     // "mohammedgaffarabdul@gmail.com "       
 to:"mohammedgaffarabdul@gmail.com",              //`${req.body.mailerState.mailto}`
subject:`${req.body.mailerState.subject}`,
text:`${req.body.mailerState.description}`,
//  subject:` ${req.body.mailerState.subject}`,           //`${req.body.mailerState.subject}`
//  text: `${req.body.mailerState.description}`,        
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    res.json({
      status: "fail",
    });
  } else {
    console.log("== Message Sent ==");
    res.json({
      status: "success",
    });
  }
});
});

const port = 5000;
app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});