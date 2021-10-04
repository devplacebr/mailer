export interface SendSingleTemplateEmailInput {
  to?: string;
  cc?: string[];
  cco?: string[];
  templateName: string;
  templateData?: Record<string, unknown>;
}
