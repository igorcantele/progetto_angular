import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Source } from '../news';
import { CommonModule } from '@angular/common';
import { NewsServiceBase } from '../service/news-service-base';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    MatButton,
    CommonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  currService = input.required<NewsServiceBase>();
  private readonly formGroupDirective = inject(FormGroupDirective);
  protected readonly sources = signal(Object.values(Source));
  protected form: FormGroup;

  ngOnInit() {
    this.form = this.formGroupDirective.control;
  }

  addPage() {
    const prevPage = this.currService().page.getValue();
    this.currService().page.next({
      page: prevPage.page + 1,
      size: prevPage.size,
    });
  }
}
