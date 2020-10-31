import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { SignUp } from '../Models/MasterModels/SignUpModel';
import { LoginService } from '../Services/MasterService/Login.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  router: any;

  encrpUserName: string;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    public LoginService: LoginService,
    public Router: Router,
    private route: ActivatedRoute
  ) { }

@ViewChild(FormGroupDirective, { static: false }) SignUpFormDirective: FormGroupDirective
SignUpForm: FormGroup;

SignUpObject: SignUp = new SignUp()
SignUpList: SignUp[];

  ngOnInit(): void {

    this.GetUserName();


    this.SignUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmePassword: new FormControl('', Validators.required)

    });
  }

  GetUserName(){

    this.route.params
      .subscribe(params => {
        console.log('params', params)
        this.encrpUserName = params.encrpUserName;
      });

    this.LoginService.GetUserName(this.encrpUserName)
      .subscribe(response => {
        console.log('GetUsername', response)
        if (response.code == '1000') {
          this.SignUpObject.userID = response.data[0].userID
          this.SignUpObject.username = response.data[0].username
        }
        else {
          this.alertService.showError(response.description)
        }
      }
      );

  }

  onSubmit(){
    this.SignUpObject.username ;
    this.SignUpObject.password = this.SignUpForm.value.password;
    this.SignUpObject.confirmpassword = this.SignUpForm.value.confirmePassword;


    console.log('SignUpObject',this.SignUpObject)

      this.LoginService.UserProcessFirstSignup(this.SignUpObject)
        .subscribe(data => {
          console.log('UserProcessFirstSignup', data)
          if (data.code == '1000') {
            this.alertService.showSuccess('Successfully inserted')
            this.Router.navigate(['/Login']);
          }
          else {
            this.alertService.showError(data.description)
          }
        }
        );
    }


  }


