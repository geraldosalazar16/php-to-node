  
var nodemailer = require('nodemailer');

exports.sendMail = ({from, to, subject, body}) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
              user: '0356e8941ce7df',
              pass: '11d9eca5710722'
            }
          });
          
          var mailOptions = {
            from,
            to,
            subject,
            text: body
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              reject({
                  result: 'failure',
                  error
              });
            } else {
              resolve({
                  result: 'success',
              });
            }
          });
    });
}
