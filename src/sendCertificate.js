const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
// require('dotenv').config();

const sendCertificate = async (data, pdfFilePath) => {
    const { first_name, last_name, emailUser } = data;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: `"law.code_" <${process.env.GMAIL_USER}>`,
        to: emailUser,
        subject: 'Certificate Award',
        template: 'email',
        context: {
            name: `Hello ${first_name} ${last_name}`,
            company: 'Dev Informatika',
        },
        attachments: [
            {
                filename: 'certificate.pdf',
                path: pdfFilePath,
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendCertificate;
