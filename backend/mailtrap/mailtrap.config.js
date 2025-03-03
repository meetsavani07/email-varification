import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,  
    token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  /* email: "mailtrap@demomailtrap.com", */
  name: "Meet Savani",
};

// ***** Extra Code for Email Templete *****
// const recipients = [
//   {
//     email: "savanimeet11@gmail.com",
//   }
// ];

// Use mailtrapClient instead of client
// mailtrapClient
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log)
//   .catch(console.error);
