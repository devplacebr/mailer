# MAILER SCHEDULER WITH SQS, SES and Lambda

Devplace Template Mailer Helper used for internal (and public) projects.

Usefull to send transactional templates like recovery passwords request, first time activation, OTP, etc.

- Scheduled by SQS
- Handled by Lambda Function and SES

## Instalation

* ```yarn add @devplace/mailer```


## LOCAL CONFIGURATION

Configure your env vars:

```bash
  MAILER_FROM="Dont Reply <dont-reply@domain.com>"
  MAILER_SQS_QUEUE_URL=YOUR-AWS-SQS_FIFO-QUEUE-URL
  MAILER_SQS_ACCESS_KEY_ID=YOUR-AWS-SQS-ACCESS-KEY
  MAILER_SQS_SECRET_ACCESS_KEY=YOUR-AWS-SQS-SECRET-KEY
```

## AWS CONFIGURATION

1. Configure your SES domain mailer: [LINK](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html).

2. Create a SES template with a ```payload.json``` file:

```json
  {
    "Template": {
      "TemplateName": "TEST_DEVPLACE",
      "SubjectPart": "Hello, {{name}}!",
      "HtmlPart": "<h1>Hello {{name}},</h1><p>Your link is {{link}}.</p>",
      "TextPart": "TEST: {{name}}. Show when client webmail dont recognize HTML."
    }
  }
```

3. Create the tempalte with AWS CLI:

```bash
aws ses create-template --cli-input-json file://payload.json
```

4. Create your Lambda Function to consume the SQS job and send the email via SES: [LINK](https://aws.amazon.com/pt/premiumsupport/knowledge-center/lambda-send-email-ses/)


## USE

```typescript
import { sendTemplateEmail } from '@devplace/mailer'


// function sendSimpleTemplate(params: SendSingleTemplateEmailInput){ // Typescript approach
function sendSimpleTemplate(input){
  await sendTemplateEmail(input);
}

sendSimpleTemplate({
  to: 'example@domain.com', // Required
  cc:['example2@domain.com'], // Optional
  template: "TEMPLATE_XPTO", // Required: SES template string
  templateData: {name: "Lucas", buttonLink: "http://domain.com.br" } // Required: SES template data (required by each specific template)
});

```

