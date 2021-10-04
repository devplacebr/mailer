export interface SendSingleTemplateEmailInput {
  to?: string;
  cc?: string[];
  bcc?: string[];
  templateName: string;
  templateData?: Record<string, unknown>;
}
