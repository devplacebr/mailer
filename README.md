# MAILER SCHEDULER WITH SQS and Lambda

Devplace Template Mailer Helper used for internal (and public) projects.

Usefull to send transactional templates like recovery passwords request, first time activation, OTP, etc.

- Scheduled by SQS
- Handled by Lambda Function (nodemailer)

## Instalation

* ```yarn add @devplace/mailer```


## LOCAL CONFIGURATION

Configure your env vars:

```bash
  AWS_MAILER_REGION=YOUR-AWS-SQS-REGION-DEFAULTS-TO-US-EAST-1
  AWS_MAILER_ACCESS_KEY_ID=YOUR-AWS-SQS-ACCESS-KEY
  AWS_MAILER_SECRET_ACCESS_KEY=YOUR-AWS-SQS-SECRET-KEY
  AWS_MAILER_SQS_FIFO_QUEUE_URL=YOUR-AWS-SQS_FIFO-QUEUE-URL
```

## LAMBDA CONFIGURATION

1. Create your Lambda Function to consume the SQS job and send the email via nodemailer: [EXAMPLES](https://www.edwardbeazer.com/sending-email-using-nodemailer-using-a-lambda/)

## USE

```typescript
import { EmailService } from '@devplace/mailer'

const client = new EmailService()

// function sendSimpleTemplate(params: SendSingleTemplateEmailInput){ // Typescript approach
function sendSimpleTemplate(input){
  await client.sendTemplateEmail(input);
}

// Schedule via SQS
sendSimpleTemplate({
  to: 'example@domain.com', // Required
  cc:['example2@domain.com'], // Optional
  template: "TEMPLATE_XPTO", // Required
  templateData: { name: "Lucas", buttonLink: "http://domain.com.br" } // Required
});
```