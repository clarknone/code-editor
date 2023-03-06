export interface ApiResponse {
  error?: string;
  statusCode: Number;
  output?: string;
  memory?: string;
  cpuTime?: string;
}

export interface LanguageOption {
  title: string;
  value: string;
  compileValue?: string;
}

export interface Step {
  title: string;
}

export interface QuestionInterface {
  instruction: string;
  name: string;
  steps: Step[];
}
