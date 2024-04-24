import { Component, input } from '@angular/core';
import { News, Source } from '../news';
import { CommonModule } from '@angular/common';
import { ApplyPipe } from '../../../shared/apply-pipe/apply.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ApplyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  news = input.required<News>();
  protected readonly input = input;

  getClassFromSource(source: Source) {
    const sourceToClass: Record<Source, string> = {
      [Source.HACKER]: 'hacker-badge',
      [Source.BBC]: 'bbc-badge',
      [Source.NYTIMES]: 'ny-badge',
    };
    return sourceToClass[source];
  }
}
