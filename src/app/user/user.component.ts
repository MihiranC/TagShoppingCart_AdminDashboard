import { Component, OnInit } from '@angular/core';
import {AlertService} from './../Services/Alert.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private alertService: AlertService) { }

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
}
