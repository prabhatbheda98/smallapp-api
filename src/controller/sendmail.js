const nodemailer = require('nodemailer')


const sendEmail = async (email, subject, url) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: 'gmail',
            // port: 587,
            // secure: true,
            auth: {
                user: 'cse.170840107004@gmail.com',
                pass: 'prabhu@251998',
            },
        });


        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `
                    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                    <h2 style="text-align: center; text-transform: uppercase;color: teal;">RESET PASSWORD</h2>
                    <p>Congratulations! You're almost set to simple method change password  .
                        Just click the button below to validate your email address.
                    </p>
                    
                    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">click</a>
                
                    <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                
                    <div>${url}</div>
                    </div>
                `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail