export interface SendSingleTemplateEmailInput {
  to: string;
  cc?: string[];
  templateName: string;
  templateData?: Record<string, unknown>;
}
