export class UpdateUserDTO {
  readonly password?: string
  readonly name?: string
  readonly email?: string
  readonly language?: string
  readonly targetLanguage?: string
  readonly levels?: {language: string, level: number}[];
}