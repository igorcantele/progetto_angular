import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../shared/notification-service/notification.service';

@Injectable()
export class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly notificationsService = inject(NotificationService);

  protected queryParamsFactory(
    rawParams: Record<string, string | number>,
  ): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(rawParams)) {
      params = params.append(key, value.toString());
    }
    return params;
  }

  protected buildUrl(segment: string) {
    return Location.joinWithSlash(environment.apiUrl, segment);
  }
}
