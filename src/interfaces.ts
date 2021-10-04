export interface SendSingleTemplateEmailInput {
  to?: string;
  subject?: string;
  cc?: string[];
  bcc?: string[];
  templateName: string;
  templateData?: Record<string, unknown>;
}
