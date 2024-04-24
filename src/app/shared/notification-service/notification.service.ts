import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  error(message: string) {
    this.snackBar.open(message, 'Chiudi', {
      panelClass: 'danger',
    });
  }

  success(message: string) {
    this.snackBar.open(message, 'Chiudi', {
      panelClass: 'success',
    });
  }
}
