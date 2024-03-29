require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

function sendingEmails(from, to, subject, text) {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOption = {
      from,
      to,
      subject,
      text,
    };
    transport.sendMail(mailOption, function (error, info) {
      if (error) return reject({ message: "an error has been occured", error });
      resolve({ message: "email was sent succesfully", info });
    });
  });
}

app.post("/", (req, res) => {
  const { to, subject, text } = req.body;

  sendingEmails(
    process.env.EMAIL,
    to,
    subject,
    text
  )
    .then((result) => {
      console.log(result);
      return res.send(result.message);
    })
    .catch((err) => {
      console.log(err);
      return res.send(result.message);
    });
});
app.listen(3000, console.log(`listeing on port 3000`));
