import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }];
    try{
        const response = await mailtrapClient.send({
            from : sender,
            to : recipients,
            subject : "Verify your Email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category : "Email Varification",
        });
        console.log("Email Sent Successfully", response);
    } catch (error) {
        console.log(`error sending verification `, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};