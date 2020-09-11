export class NewsDTO {
  readonly owner: string;
  readonly subjects: [string];
  readonly title: string;
  readonly body: string;
  readonly pictures: [string];
  readonly created_at: Date;
}