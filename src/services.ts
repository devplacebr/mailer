import {SQSClient as SQS, SendMessageCommand} from '@aws-sdk/client-sqs';
import {v4 as uuid} from 'uuid';
import {SendSingleTemplateEmailInput} from './interfaces';

export const sendTemplateEmail = async () => {};

export class EmailService {
  private readonly client = new SQS({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  async sendSingleTemplateEmail(params: SendSingleTemplateEmailInput) {
    const {AWS_SQS_FIFO_QUEUE_URL, APP_NAME = 'mailer'} = process.env;

    const command = new SendMessageCommand({
      QueueUrl: AWS_SQS_FIFO_QUEUE_URL,
      MessageDeduplicationId: uuid(),
      MessageGroupId: APP_NAME,
      MessageBody: JSON.stringify(params),
    });

    await this.client.send(command);
  }
}
