import {SQSClient as SQS, SendMessageCommand} from '@aws-sdk/client-sqs';
import {v4 as uuid} from 'uuid';
import {SendSingleTemplateEmailInput} from './interfaces';

export const sendTemplateEmail = async () => {};

export class EmailService {
  private readonly client = new SQS({
    region: process.env.MAILER_SQS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.MAILER_SQS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.MAILER_SQS_SECRET_ACCESS_KEY as string,
    },
  });

  async sendSingleTemplateEmail(params: SendSingleTemplateEmailInput) {
    const sesParams = {
      Source: process.env.MAILER_FROM,
      Destination: {
        ToAddresses: params.to,
        CcAddresses: params.cc || [],
      },
      Template: params.template,
      TemplateData: params.templateData
        ? JSON.stringify(params.templateData)
        : JSON.stringify({}),
    };

    const command = new SendMessageCommand({
      QueueUrl: process.env.MAILER_SQS_QUEUE_URL,
      MessageDeduplicationId: uuid(),
      MessageGroupId: process.env.APP_NAME || 'mailer',
      MessageBody: JSON.stringify(sesParams),
    });

    await this.client.send(command);
  }
}
