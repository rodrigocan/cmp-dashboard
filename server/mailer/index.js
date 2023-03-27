import * as dotenv from 'dotenv'
import nodemailer from "nodemailer"
import handlebars from "handlebars"

import emailTemplateSource from "./templates/createTicketTemplate.hbs"

dotenv.config()

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIl,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const template = handlebars.compile(emailTemplateSource)

const htmlToSend = template({ message: "Hello World!" })

transport.sendMail({
  from: "Manoel Rodrigo Cândido <manoel_70019@trt5.jus.br>",
  to: "rodrigocan@gmail.com",
  subject: "Enviando e-mail com Nodemailer",
  html: htmlToSend,
  text: "Olá, mundo!"
})
.then(() => console.log("E-mail enviado com sucesso!"))
.catch((err) => console.log("Erro ao enviar e-mail: ", err))