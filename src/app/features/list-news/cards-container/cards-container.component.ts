import { Component, inject, input } from '@angular/core';
import { News } from '../news';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NewsServiceBase } from '../service/news-service-base';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListNewsService } from '../service/list-news.service';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardComponent, CommonModule, MatProgressSpinner],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.scss',
})
export class CardsContainerComponent {
  newsList = input.required<News[]>();
  service = input<NewsServiceBase>(inject(ListNewsService));
  isLoading = toSignal(this.service().isLoading, { initialValue: false });
}
