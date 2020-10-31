import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { PasswordReset } from '../Models/MasterModels/PasswordResetModel';
import { LoginService } from '../Services/MasterService/Login.service';
import { Router } from '@angular/router';
import { ChangePassword } from '../Models/MasterModels/ChangePasswordModel';

import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  router: any;
  //ChangePasswordObject: ChangePassword;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    public LoginService: LoginService,
    public Router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(FormGroupDirective, { static: false }) PasswordResetFormDirective: FormGroupDirective
  PasswordResetForm: FormGroup;

  ChangePasswordObject: ChangePassword = new ChangePassword();


  ngOnInit(): void {

    //to subscribe the URL parameters
    // this.route.params
    //   .subscribe(params => {
    //     console.log("params", params)
    //     this.ChangePasswordObject.username = params.username;
    //     this.ChangePasswordObject.userID = params.userID;

    //   }

    //   );

      //var userID = +localStorage.getItem("userID");
      //console.log('thisISUserID22',userID)
      //alert('HI MIHIRAN22')
      this.ChangePasswordObject.username = localStorage.getItem("username");
      this.ChangePasswordObject.userID = localStorage.getItem("userID");

      //console.log('ChangePasswordObjectAfterLocal',this.ChangePasswordObject)



    this.PasswordResetForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmePassword: new FormControl('', Validators.required),
      resetCode: new FormControl('', Validators.required)



    });

  }


  onSubmit() {

    if (this.PasswordResetForm.value.confirmePassword == this.PasswordResetForm.value.password) {
      this.ChangePasswordObject.password = this.PasswordResetForm.value.password;
      this.ChangePasswordObject.resetCode = this.PasswordResetForm.value.resetCode;

      //console.log('ChangePasswordObjectNewwww',this.ChangePasswordObject)

      this.LoginService.ChangePasswordForUser(this.ChangePasswordObject)
        .subscribe(data => {

          if (data.code == "1000") {
            this.Router.navigate(['/Login']);
            this.PasswordResetForm.reset();
            this.alertService.showSuccess('Your Password Reset Successfull')

          }
          else {
            this.alertService.showError(data.description)
          }

        },
          //this.handleErrorResponse
        );

    }

    else

      this.alertService.showError('Your Password is Mismatch')


  }

}
