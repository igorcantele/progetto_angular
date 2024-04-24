import { Injectable } from '@angular/core';
import { Page } from '../../../core/api/api';
import { News, Source } from '../news';
import { catchError, Observable, of } from 'rxjs';
import { NewsFetchService, NewsServiceBase } from './news-service-base';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends NewsServiceBase implements NewsFetchService {
  private readonly url = this.buildUrl('news');

  getNews(page: Page, source?: Source) {
    const params = this.queryParamsFactory(page);
    const url = Location.joinWithSlash(this.url, source ?? '');
    return this.http.get<News[]>(url, { params }).pipe(
      catchError((err): Observable<News[]> => {
        console.error(err);
        this.notificationsService.error(
          `C'è stato un problema nel prendere gli articoli`,
        );
        return of([]);
      }),
    );
  }
}
