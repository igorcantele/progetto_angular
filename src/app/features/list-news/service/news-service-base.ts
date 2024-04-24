import { Page } from '../../../core/api/api';
import { News, Source } from '../news';
import { BehaviorSubject, map, merge, Observable, Subject } from 'rxjs';
import { ApiService } from '../../../core/api/api.service';
import {
  applyManipulation,
  ManipulationStrategies,
} from '../../../shared/manipulation-stream/manipulate-stream';

export interface NewsFetchService {
  getNews(page: Page, source: Source): Observable<News[]>;
}

export class NewsServiceBase extends ApiService {
  private readonly partial$ = new BehaviorSubject<News[]>([]);
  private readonly add$ = new Subject<void>();
  private readonly clear$ = new Subject<void>();
  private readonly manipulations$ = merge(
    this.add$.pipe(map(() => ManipulationStrategies.ADD_ARRAY)),
    this.clear$.pipe(map(() => ManipulationStrategies.CLEAR)),
  );
  private readonly news = new BehaviorSubject<News[]>([]);
  private readonly updateNews$ = applyManipulation(
    this.manipulations$,
    this.news,
    this.partial$,
  ).subscribe((value) => this.news.next(value));

  get news$() {
    return this.news.asObservable();
  }

  addNews(news: News[]) {
    this.partial$.next(news);
    this.add$.next();
  }

  clearNews() {
    this.clear$.next();
  }

  public readonly page = new BehaviorSubject<Page>({ page: 0, size: 30 });
  public readonly isLoading = new Subject<boolean>();
}
