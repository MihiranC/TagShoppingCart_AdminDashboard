import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { ChangePassword } from '../Models/MasterModels/ChangePasswordModel';
import { ChangePasswordService } from '../Services/MasterService/ChangePassword.service';
import { LoginService } from '../Services/MasterService/Login.service';



import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  router: any;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    public ChangePasswordService: ChangePasswordService,
    public LoginService: LoginService,
    public Router: Router

  ) { }

  @ViewChild(FormGroupDirective, { static: false }) ChangePasswordFormDirective: FormGroupDirective
  ChangePasswordForm: FormGroup;

  ChangePasswordObject: ChangePassword = new ChangePassword();
  ChangePasswordList: ChangePassword[];

  ngOnInit(): void {

    this.ChangePasswordForm = new FormGroup({
      userInput: new FormControl(),

    });

  }


  onSubmit() {
    this.ChangePasswordObject.userInput = this.ChangePasswordForm.value.userInput;
    this.LoginService.ChangePasswordForUserRequest(this.ChangePasswordObject.userInput)
      .subscribe(response => {
        console.log('ChangePasswordObject', response)
        if (response.code == "1000") {
          //var userID = response.data[0].userID
          //var username = response.data[0].username


          localStorage.setItem("userID", `${response.data[0].userID}`);
          localStorage.setItem("username", `${response.data[0].username}`);

         // var userID = +localStorage.getItem("userID");

          //console.log('thisISUserID1',userID)
          //alert('HI MIHIRAN')

          this.Router.navigate(['/ResetPassword']);
          //this.clearForm();
        }
        else {
          this.alertService.showError(response.description)
        }
      }
      );



  }


  clearForm() {
    this.ChangePasswordForm.reset();

  }

}
