import { Component, OnInit, ViewChild } from '@angular/core';
import {AlertService} from './../Services/Alert.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Users } from '../Models/MasterModels/UserModel';
import { UserService } from '../Services/MasterService/User.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateData } from '../Models/UpdateData';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  result: string = '';

  UserNameField: boolean;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,
    private userService: UserService,
  ) {
    this.dataSource = new MatTableDataSource(this.usersList);
   }


  OperationBtnText: string = 'Add'
  userObject: Users = new Users()
  usersList: Users[];
  userID: number = 1;
  updateDate : UpdateData = new UpdateData()

  @ViewChild(FormGroupDirective, { static: false }) DistrictFormDirective: FormGroupDirective
  UserForm: FormGroup;

  //@ViewChild(MatSort, null) Sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['First Name','Last Name','Mobile Number', 'Address', 'Actions'];
  dataSource = new MatTableDataSource(this.usersList);


  ngOnInit(): void {
    this.UserForm = new FormGroup({
      userID: new FormControl(),
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(),
      addressLine3: new FormControl(),
      addressLine4: new FormControl(),
      email: new FormControl('', Validators.required)
    });
    this.loadExistingUser();
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
  // confirmDialog(): void {
  //   const message = `Are you sure you want to do this?`;

  //   const dialogData = new ConfirmDialogModel("Confirm Action", message);

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: "700px",
  //     data: dialogData,
  //     panelClass:'custom-dialog-container'
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     this.result = dialogResult;
  //   });
  // }

  // added with user for and table
  applyFilter(event: Event) {
    console.log('event', event)
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('event', filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Insert and Update the officer Details.
  onSubmit() {

    this.userObject.username = this.UserForm.value.username;
    this.userObject.firstName = this.UserForm.value.firstName;
    this.userObject.lastName = this.UserForm.value.lastName;
    this.userObject.addressLine1 = this.UserForm.value.addressLine1;
    this.userObject.addressLine2 = this.UserForm.value.addressLine2;
    this.userObject.addressLine3 = this.UserForm.value.addressLine3;
    this.userObject.addressLine4 = this.UserForm.value.addressLine4;
    this.userObject.mobileNo = this.UserForm.value.mobileNo;
    this.userObject.email = this.UserForm.value.email;

    console.log('UserOBJECT',this.userObject)

    if (this.OperationBtnText == "Add") {
      this.userObject.userID = -999;
      this.userService.InsertUsers(this.userObject)
        .subscribe(data => {
          console.log('UserObject', data)
          if (data.code == "1000") {
            this.alertService.showSuccess('Successfully inserted')
            //this.clearForm();
            this.loadExistingUser();
          }
          else {
            this.alertService.showError(data.description)
          }
        }
        );
    }
    else {
      this.updateDate.newData = this.UserForm.value
      this.updateDate.userID = this.userID

      console.log('updateDate', this.updateDate)

      this.userService.UpdateUsers(this.updateDate)
      .subscribe(data => {
        console.log('UserObjectInUpdate', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully updated')
          this.clearForm();
          this.loadExistingUser();
          this.OperationBtnText = "Add";
        }
        else {
          this.alertService.showError(data.description)
        }
      }
      );
    }

  }

  clearForm() {
    this.UserForm.reset();
    this.OperationBtnText = "Add";
  }

  loadExistingUser() {
    this.userService.ReturnUsers(-999).subscribe(response => {
      this.usersList = response.data
      this.dataSource = new MatTableDataSource(this.usersList);
      console.log('userObject', this.usersList)
      this.dataSource.paginator = this.paginator;
    });
  }

  selectDataToForm(row: any) {
    console.log('start',row)
        this.UserForm.patchValue({
          userID: row.userID,
          username:row.username,
          firstName: row.firstName,
          lastName: row.lastName,
          mobileNo: row.mobileNo,
          email:row.email,
          addressLine1: row.addressLine1,
          addressLine2: row.addressLine2,
          addressLine3: row.addressLine3,
          addressLine4: row.addressLine4,

        });
        this.updateDate.oldData = this.UserForm.value;
        this.OperationBtnText = "Update";
        //this.UserNameField=true
  }

  onDelete(row: any) {
    //.userObject.userID =  row.userID;
    this.userObject.username = row.username;
    this.userObject.firstName = row.firstName;
    this.userObject.lastName = row.lastName;
    this.userObject.addressLine1 = row.addressLine1;
    this.userObject.addressLine2 = row.addressLine2;
    this.userObject.addressLine3 = row.addressLine3;
    this.userObject.addressLine4 = row.addressLine4;
    this.userObject.mobileNo = row.mobileNo;
    this.userObject.email = row.email;


    this.userObject.userID = row.userID;

    this.userService.DeleteUsers(this.userObject)
      .subscribe(data => {
        console.log('UserObjectForDelete', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully deleted')
          this.clearForm();
          this.loadExistingUser();
        }
        else {
          this.alertService.showError(data.description)
        }
      }
      );
  }

  confirmDialog(row: any): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Delete confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      panelClass: 'custom-error-dialog-container'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('districtObject', dialogResult)
      if (dialogResult) {
        this.onDelete(row);
      }
    });
  }




}
