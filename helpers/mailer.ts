import nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        // create hashed token 
        const hashedToken = bcryptjs.hash(userId.toString(), 10);

        if(emailType === 'VERIFY') {
                
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000}
            )
        } else if (emailType === 'RESET') {
            
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000}
            )
        }
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e95ddd2683e886",
              pass: "c7405d42036b71"
            }
          });

          const mailOptions = {
            from: 'emavec2002@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
            <p>Click 
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
                to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
                or copy & paste link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}