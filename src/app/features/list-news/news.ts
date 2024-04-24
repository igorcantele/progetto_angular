export class News {
  id?: string;
  title: string;
  url: string;
  publishDate: Date;
  source: Source;
  type: string;
}

export enum Source {
  HACKER = 'Hacker',
  NYTIMES = 'NyTimes',
  BBC = 'Bbc',
}
