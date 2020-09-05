import { Component, OnInit } from '@angular/core';
import {AlertService} from './../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  result: string = '';
  constructor(
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  ErrorMsg() {
    this.alertService.showError('Error Message Example');
  }
  SuccessMsg() {
    this.alertService.showSuccess('Success Message  Example');
  }
  InfoMsg() {
    this.alertService.showInfo('Info Message  Example');
  }
  WarningMsg() {
    this.alertService.showWarning('Warning Message  Example');
  }
  Msg() {
    this.alertService.show('Message  Example');
  }
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData,
      panelClass:'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
}
