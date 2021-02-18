export class ResponseUserDTO {
  readonly username: string;
  readonly name: string;
  readonly language: string;
  readonly targetLanguage: string;
  readonly levels: {
    language: string;
    level: number;
  }[];
  readonly userboard: {};
  readonly createAt: DateConstructor;
}