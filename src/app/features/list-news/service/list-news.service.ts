import { Injectable } from '@angular/core';
import { NewsFetchService, NewsServiceBase } from './news-service-base';
import { Page } from '../../../core/api/api';
import { News } from '../news';
import { BehaviorSubject, catchError, EMPTY, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListNewsService
  extends NewsServiceBase
  implements NewsFetchService
{
  private readonly url = this.buildUrl('list');
  override readonly page = new BehaviorSubject<Page>({ page: 0, size: 10 });

  getNews(page: Page) {
    const params = this.queryParamsFactory(page);
    return this.http.get<News[]>(this.url, { params }).pipe(
      catchError((err): Observable<News[]> => {
        console.error(err);
        this.notificationsService.error(
          `C'è stato un problema nel prendere gli articoli`,
        );
        return of([]);
      }),
    );
  }

  saveNews(news: News) {
    return this.http.post(this.url, news).pipe(
      catchError((err): Observable<News[]> => {
        console.error(err);
        this.notificationsService.error(
          `C'è stato un problema nel salvataggio dell'articolo`,
        );
        return EMPTY;
      }),
      finalize(() =>
        this.notificationsService.success('Elemento salvato correttamente'),
      ),
    );
  }
}
