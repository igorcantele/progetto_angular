import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  combineLatestWith,
  concatMap,
  debounceTime,
  map,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ListNewsService } from './service/list-news.service';
import { CommonModule } from '@angular/common';
import { NewsFetchService, NewsServiceBase } from './service/news-service-base';
import { NewsService } from './service/news.service';
import { isLoading } from '../../shared/loading/loading';
import { FiltersComponent } from './filters/filters.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { Source } from './news';
import {
  MatTab,
  MatTabChangeEvent,
  MatTabContent,
  MatTabGroup,
} from '@angular/material/tabs';
import { AddNewsComponent } from './add-news/add-news.component';

@Component({
  selector: 'app-list-newsList',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    CardsContainerComponent,
    ReactiveFormsModule,
    MatTabGroup,
    MatTab,
    MatTabContent,
    AddNewsComponent,
  ],
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.scss',
})
export class ListNewsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly listNewsService = inject(ListNewsService);
  private readonly newsService = inject(NewsService);

  protected readonly form = this.fb.group({
    source: [Source.HACKER],
    manual: [false, Validators.required],
  });
  private readonly serviceToUse$ = this.form.get('manual').valueChanges.pipe(
    startWith(this.form.get('manual').getRawValue()),
    map((manualResearch: boolean): NewsServiceBase & NewsFetchService =>
      manualResearch ? this.listNewsService : this.newsService,
    ),
  );
  protected readonly serviceToUse = toSignal(this.serviceToUse$, {
    initialValue: this.newsService,
  });

  private readonly page$ = this.serviceToUse$.pipe(
    switchMap((service) => service.page.asObservable()),
  );
  private readonly queryParam$ = this.form.valueChanges.pipe(
    startWith(this.form.getRawValue()),
    map(({ source }) => source),
    combineLatestWith(this.page$),
  );

  private readonly currentNews$ = this.serviceToUse$.pipe(
    switchMap((service) => service.news$),
  );
  protected readonly newsList = toSignal(this.currentNews$, {
    requireSync: true,
    manualCleanup: true,
  });

  constructor() {
    this.resetNewsAndPageOnSourceChange();
    this.populateNewsOnFilterChange();
  }

  private resetNewsAndPageOnSourceChange() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(), withLatestFrom(this.serviceToUse$))
      .subscribe(([{ manual }, service]) => {
        service.clearNews();
        const size = manual ? 10 : 30;
        service.page.next({
          page: 0,
          size,
        });
      });
  }

  private populateNewsOnFilterChange() {
    this.queryParam$
      .pipe(
        debounceTime(150),
        withLatestFrom(this.serviceToUse$),
        concatMap(([[source, page], service]) =>
          service.getNews(page, source).pipe(isLoading(service.isLoading)),
        ),
        withLatestFrom(this.serviceToUse$),
        takeUntilDestroyed(),
      )
      .subscribe(([news, service]) => service.addNews(news));
  }

  changeMode($event: MatTabChangeEvent) {
    const idx = $event.index;
    if (idx > 1) return;
    const manual = idx == 1;
    this.form.patchValue({ manual });
  }
}
