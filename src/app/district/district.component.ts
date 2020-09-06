import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Districts } from '../Models/MasterModels/DistrictModel';
import { DistrictService } from '../Services/MasterService/District.service';
import { AlertService } from '../Services/Alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateData } from '../Models/UpdateData';


@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})

export class DistrictComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private districtService: DistrictService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.districtsList);
  }

  OperationBtnText: string = 'Add'
  districtObject: Districts = new Districts()
  districtsList: Districts[];
  userID: number = 1;
  updateDate : UpdateData = new UpdateData()

  @ViewChild(FormGroupDirective, { static: false }) DistrictFormDirective: FormGroupDirective
  DistrictForm: FormGroup;

  //@ViewChild(MatSort, null) Sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'Actions'];
  dataSource = new MatTableDataSource(this.districtsList);

  ngOnInit(): void {
    this.DistrictForm = new FormGroup({
      districtID: new FormControl(),
      name: new FormControl('', Validators.required)
    });
    this.loadExistingDistrict();
  }

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
    this.districtObject.districtID = -999;
    this.districtObject.name = this.DistrictForm.value.name;
    this.districtObject.userID = this.userID;

    if (this.OperationBtnText == "Add") {
      this.districtService.InsertDistricts(this.districtObject)
        .subscribe(data => {
          console.log('districtObject', data)
          if (data.code == "1000") {
            this.alertService.showSuccess('Successfully inserted')
            this.clearForm();
            this.loadExistingDistrict();
          }
          else {
            this.alertService.showError(data.description)
          }
        }
        );
    }
    else {
      this.updateDate.newData = this.DistrictForm.value
      this.updateDate.userID = this.userID

      console.log('updateDate', this.updateDate)

      this.districtService.UpdateDistricts(this.updateDate)
      .subscribe(data => {
        console.log('districtObject', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully updated')
          this.clearForm();
          this.loadExistingDistrict();
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
    this.DistrictForm.reset();
    this.OperationBtnText = "Add";
  }

  loadExistingDistrict() {
    this.districtService.ReturnDistricts(-999).subscribe(response => {
      this.districtsList = response.data
      this.dataSource = new MatTableDataSource(this.districtsList);
      console.log('districtObject', this.districtsList)
      this.dataSource.paginator = this.paginator;
    });
  }

  selectDataToForm(row: any) {
    console.log('start',row)
        this.DistrictForm.patchValue({
          districtID: row.districtID,
          name: row.name
        });
        this.updateDate.oldData = this.DistrictForm.value;
        this.OperationBtnText = "Update";
  }

  onDelete(row: any) {
    this.districtObject.districtID = row.districtID;
    this.districtObject.name = row.name;
    this.districtObject.userID = this.userID;

    this.districtService.DeleteDistricts(this.districtObject)
      .subscribe(data => {
        console.log('districtObject', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully deleted')
          this.clearForm();
          this.loadExistingDistrict();
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
      maxWidth: "700px",
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
