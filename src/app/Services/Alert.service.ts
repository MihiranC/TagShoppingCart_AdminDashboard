import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackBar.open(message, 'Close', config);
  }

  showSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-green'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackBar.open(message, 'Close', config);
  }

  showWarning(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-yellow'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackBar.open(message, 'Close', config);
  }

  showInfo(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-blue'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackBar.open(message, 'Close', config);
  }

  show(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-gray'];
    config.duration = 5000;
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    this.snackBar.open(message, 'Close', config);
  }
}
