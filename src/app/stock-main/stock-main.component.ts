import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Stocks } from '../Models/MasterModels/StockModel';
import { StockService } from '../Services/MasterService/Stock.service';
import { AlertService } from '../Services/Alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateData } from '../Models/UpdateData';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NextCodeService } from '../Services/NextCode.service';

@Component({
  selector: 'app-stock-main',
  templateUrl: './stock-main.component.html',
  styleUrls: ['./stock-main.component.scss']
})
export class StockMainComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private stockService: StockService,
    public dialog: MatDialog,
    public NextCodeService: NextCodeService
  ) {
    this.dataSource = new MatTableDataSource(this.stockList);
  }
  color: string = '#08cf0f';

  Fixedcolor: string = '#08cf0f';

  image: string
  description: string
  titleFirstPart: string
  titleRest: string
  OperationBtnText: string = 'Add'
  nextCode: string

  stock: Stocks = new Stocks();
  stockList: Stocks[]
  userID: number = 1;
  updateDate: UpdateData = new UpdateData()

  @ViewChild(FormGroupDirective, { static: false }) StockFormDirective: FormGroupDirective
  StockForm: FormGroup;


  //@ViewChild(MatSort, null) Sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'title', 'description', 'mainImage', 'Actions'];
  dataSource = new MatTableDataSource(this.stockList);

  ngOnInit(): void {
    this.StockForm = new FormGroup({
      stockID: new FormControl(),
      code: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      color: new FormControl(this.color, Validators.required),
    });

    this.loadExistingStocks();
    this.SetNextNumber();
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


  onFileComplete(data: any) {
    this.image = data.ImageData;
    console.log('resizedImage fin', data)
    this.description = this.StockForm.value.description;
    if (this.StockForm.value.title != null) {
      this.titleFirstPart = this.StockForm.value.title.substr(0, this.StockForm.value.title.indexOf(' '));
      this.titleRest = this.StockForm.value.title.substr(this.StockForm.value.title.indexOf(' ') + 1);
    }

    var element = document.getElementById('stockImageDiv');
    element.style.display = "";
  }

  ChangeColor(color: any) {
    this.StockForm.patchValue({
      color: color
    })
  }

  ChangeTitle() {
    this.titleFirstPart = this.StockForm.value.title.substr(0, this.StockForm.value.title.indexOf(' '));
    this.titleRest = this.StockForm.value.title.substr(this.StockForm.value.title.indexOf(' ') + 1);
  }

  ChangeDescription() {
    this.description = this.StockForm.value.description;
  }

  SetNextNumber() {
    this.NextCodeService.ReturnNextCode('ST').subscribe(data => {
      console.log('next no', data)
      if (data.code == "1000") {
        this.nextCode = data.data[0].nextCode
        this.StockForm.patchValue({
          code: this.nextCode
        });
      }
      else {
        this.alertService.showError(data.description)
      }
    }
    );
  }

  onSubmit() {
    this.stock.userID = this.userID;
    this.stock.code = this.StockForm.value.code;
    this.stock.title = this.StockForm.value.title;
    this.stock.description = this.StockForm.value.description;
    this.stock.colorCode = this.StockForm.value.color;

    if (this.image == null) {
      this.alertService.showError("Please upload the image")
    } else {
      this.stock.imageData = this.image.toString();

      console.log('colorCode', this.StockForm.value)
      if (this.OperationBtnText == "Add") {
        this.stock.stockID = -999;
        this.stockService.InsertStock(this.stock)
          .subscribe(data => {
            console.log('districtObject', data)
            if (data.code == "1000") {
              this.alertService.showSuccess('Successfully inserted')
              this.clearForm();
              this.loadExistingStocks();
            }
            else {
              this.alertService.showError(data.description)
            }
          }
          );
      }
      else {
        this.stock.stockID = this.StockForm.value.stockID;

        this.updateDate.newData = this.stock
        this.updateDate.userID = this.userID

        console.log('updateDate', this.updateDate)

        this.stockService.UpdateStock(this.updateDate)
          .subscribe(data => {
            console.log('districtObject', data)
            if (data.code == "1000") {
              this.alertService.showSuccess('Successfully updated')
              this.clearForm();
              this.loadExistingStocks();
            }
            else {
              this.alertService.showError(data.description)
            }
          }
          );
      }
    }

  }

  clearForm() {
    this.StockForm.reset();
    this.OperationBtnText = "Add";
    this.image = "";
    this.description = "";
    this.titleFirstPart = "";
    this.titleRest = "";
    this.color = this.Fixedcolor;

    var element = document.getElementById('stockImageDiv');
    element.style.display = "none";
    this.StockForm.patchValue({
      color: this.color
    });
    this.SetNextNumber();
  }

  loadExistingStocks() {
    this.stockService.ReturnStocks(-999).subscribe(response => {
      this.stockList = response.data
      this.dataSource = new MatTableDataSource(this.stockList);
      console.log('stockList', response)
      this.dataSource.paginator = this.paginator;
    });
  }

  selectDataToForm(row: any) {
    console.log('start', row)
    this.StockForm.patchValue({
      code: row.code,
      stockID: row.stockID,
      title: row.title,
      description: row.description,
      color: row.colorCode,
    });
    this.color = row.colorCode;
    this.updateDate.oldData = this.StockForm.value;
    this.OperationBtnText = "Update";

    setTimeout(() => {
      this.image = 'data:image/jpeg;base64,' + row.imageData;
      this.description = this.StockForm.value.description;
      if (this.StockForm.value.title != null) {
        this.titleFirstPart = this.StockForm.value.title.substr(0, this.StockForm.value.title.indexOf(' '));
        this.titleRest = this.StockForm.value.title.substr(this.StockForm.value.title.indexOf(' ') + 1);
      }

      var element = document.getElementById('stockImageDiv');
      element.style.display = "";
    }, 10);
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

  onDelete(row: any) {

    this.stock.userID = this.userID;
    this.stock.code = row.code;
    this.stock.title = row.title;
    this.stock.description = row.description;
    this.stock.colorCode = row.colorCode;
    this.stock.stockID = row.stockID;
    this.stock.imageData = "";
    console.log('districtObject', this.stock)

    this.stockService.DeleteStock(this.stock)
      .subscribe(data => {
        console.log('districtObject', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully deleted')
          this.clearForm();
          this.loadExistingStocks();
        }
        else {
          this.alertService.showError(data.description)
        }
      }
      );
  }

}
