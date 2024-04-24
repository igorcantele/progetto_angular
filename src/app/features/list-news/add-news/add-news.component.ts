import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { News, Source } from '../news';
import { ListNewsService } from '../service/list-news.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatButton,
  ],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.scss',
})
export class AddNewsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly listNewsService = inject(ListNewsService);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required]],
    url: ['', [Validators.required]],
    publishDate: [new Date(), [Validators.required]],
    source: [undefined, [Validators.required]],
    type: ['', [Validators.required]],
  });
  protected readonly sources = signal(Object.values(Source));

  sendNews() {
    if (this.form.invalid) return;
    const news = Object.assign(new News(), this.form.getRawValue());
    this.listNewsService.saveNews(news).subscribe();
  }
}
