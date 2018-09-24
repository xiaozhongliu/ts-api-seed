/* ******************************************************************
 * mail client on the basis of nodemailer
 ****************************************************************** */
import nodemailer from 'nodemailer'
import config from '../config'
const { MAILER, MAILER_ON } = config

const transporter = nodemailer.createTransport({
    host: MAILER.HOST,
    port: MAILER.PORT,
    auth: {
        user: MAILER.USER,
        pass: MAILER.PASS,
    },
})

export default {

    /**
     * send rich text mail
     * @param appName     app name
     * @param partialBody part of mail body in html
     */
    alarm(appName: string, partialBody: string) {
        if (!MAILER_ON) return

        const body = `<span style="font-family: 'Microsoft YaHei'"><b>Error Detail:</b> ${partialBody}</span>`
        const mailOptions = {
            from: `"${MAILER.NICK_NAME}" <${MAILER.USER}>`,
            to: MAILER.RECEIVERS.join(','),
            subject: `[${process.env.NODE_ENV}] [${appName}] Service Error`,
            html: body,
        }
        transporter.sendMail(mailOptions, (err, info) => {
            err && console.log('MAIL ALARM FAIL:   ', err)
        })
    },
}
