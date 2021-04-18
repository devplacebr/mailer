export interface SendSingleTemplateEmailInput {
  to: string;
  cc?: string[];
  template: string;
  templateData?: Record<string, unknown>;
}
