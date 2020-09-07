import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Login } from '../Models/MasterModels/LoginModel';
import { LoginService } from '../Services/MasterService/Login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  router: any;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    public LoginService: LoginService,
    public Router: Router
  ) { }

@ViewChild(FormGroupDirective, { static: false }) LoginFormDirective: FormGroupDirective
LoginForm: FormGroup;

LoginObject: Login = new Login()
LoginList: Login[];

  ngOnInit(): void {

    this.LoginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl('', Validators.required)
    });



  }


  onSubmit() {
    this.LoginObject.username  = this.LoginForm.value.username;
    this.LoginObject.password  = this.LoginForm.value.password;

    console.log('LoginObject',this.LoginObject)

    this.LoginService.verifiedUserCredentials(this.LoginObject.username,this.LoginObject.password)
        .subscribe(data => {
          console.log('districtObject', data)
          if (data.code == "1000") {
            this.Router.navigate(['/Dashboard']);
            //this.alertService.showSuccess('Welcome to DashBoard')
            this.clearForm();

          }
          else {
            this.alertService.showError(data.description)
          }
        }
        );



  }

  clearForm() {
    this.LoginForm.reset();
    //this.OperationBtnText = "Add";
  }

}


