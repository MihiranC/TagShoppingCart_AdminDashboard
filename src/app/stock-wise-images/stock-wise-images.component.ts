import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { StockWiseImages } from '../Models/MasterModels/StockWiseImagesModel';
import { Stocks } from '../Models/MasterModels/StockModel';
import { StockService } from '../Services/MasterService/Stock.service';
import { StockWiseImagesService } from '../Services/MasterService/StockWiseImages.service';
import { AlertService } from '../Services/Alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateData } from '../Models/UpdateData';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NextCodeService } from '../Services/NextCode.service';
import * as $ from 'jquery';
declare const require: any;

@Component({
  selector: 'app-stock-wise-images',
  templateUrl: './stock-wise-images.component.html',
  styleUrls: ['./stock-wise-images.component.scss']
})
export class StockWiseImagesComponent implements OnInit {

  constructor
    (
      private alertService: AlertService,
      private stockService: StockService,
      private StockWiseImagesService: StockWiseImagesService,
      public dialog: MatDialog,
      public NextCodeService: NextCodeService
    ) {
    this.dataSource = new MatTableDataSource(this.StockWiseImagesList);
  }

  color: string = '#08cf0f';

  Fixedcolor: string = '#08cf0f';

  image: string
  description: string
  titleFirstPart: string
  titleRest: string
  OperationBtnText: string = 'Add'
  nextCode: string

  stockWiseImages: StockWiseImages = new StockWiseImages();
  StockWiseImagesList: StockWiseImages[]
  stockList: Stocks[]
  userID: number = 1;
  updateDate: UpdateData = new UpdateData()

  @ViewChild(FormGroupDirective, { static: false }) StockWiseImagesFormDirective: FormGroupDirective
  StockWiseImagesForm: FormGroup;


  //@ViewChild(MatSort, null) Sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['title',  'Image', 'Actions'];
  dataSource = new MatTableDataSource(this.StockWiseImagesList);

  ngAfterViewInit() {
    //We loading the player script on after view is loaded
    setTimeout(() => {
      require('../../assets/js/slideshow.js');
    }, 500);
  }

  ngOnInit(): void {
    this.StockWiseImagesForm = new FormGroup({
      imageID: new FormControl(),
      imageURL: new FormControl(),
      stockID: new FormControl('', Validators.required),
      title: new FormControl('')
    });

    this.loadExistingStocks();
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

    var element = document.getElementById('stockImageDiv');
    element.style.display = "";
  }


  onSubmit() {
    this.stockWiseImages.userID = this.userID;
    this.stockWiseImages.title = this.StockWiseImagesForm.value.title;
    this.stockWiseImages.stockID = this.StockWiseImagesForm.value.stockID;

    if (this.image == null) {
      this.alertService.showError("Please upload the image")
    } else {
      this.stockWiseImages.imageData = this.image.toString();

      if (this.OperationBtnText == "Add") {
        this.stockWiseImages.imageID = -999;
        this.stockService.ReturnStocks(this.stockWiseImages.stockID).subscribe(response => {//get stock Code
          this.stockWiseImages.stockCode = response.data[0].code
          console.log('stockWiseImages',this.stockWiseImages)
          this.StockWiseImagesService.InsertStockWiseImages(this.stockWiseImages)
            .subscribe(data => {
              console.log('districtObject', data)
              if (data.code == "1000") {
                this.alertService.showSuccess('Successfully inserted')
                this.clearForm();
                this.loadExistingStockWiseImages(this.stockWiseImages.stockID);
                this.StockWiseImagesForm.patchValue({
                  stockID: this.stockWiseImages.stockID
                });
              }
              else {
                this.alertService.showError(data.description)
              }
            }
            );
        });
      }
      else {
        this.stockWiseImages.imageID = this.StockWiseImagesForm.value.imageID;
        this.stockWiseImages.imageURL = this.StockWiseImagesForm.value.imageURL;

        this.updateDate.newData = this.stockWiseImages
        this.updateDate.userID = this.userID

        console.log('updateDate', this.updateDate)
        this.stockService.ReturnStocks(this.stockWiseImages.stockID).subscribe(response => {//get stock Code
          this.stockWiseImages.stockCode = response.data[0].code
          this.StockWiseImagesService.UpdateStockWiseImages(this.updateDate)
            .subscribe(data => {
              console.log('districtObject', data)
              if (data.code == "1000") {
                this.alertService.showSuccess('Successfully updated')
                this.clearForm();
                this.loadExistingStockWiseImages(this.stockWiseImages.stockID);
                this.StockWiseImagesForm.patchValue({
                  stockID: this.stockWiseImages.stockID
                });
              }
              else {
                this.alertService.showError(data.description)
              }
            }
            );
        });
      }
    }

  }

  clearForm() {
    this.StockWiseImagesForm.reset();
    this.OperationBtnText = "Add";
    this.image = "";
    this.StockWiseImagesList = [];
    this.loadExistingStockWiseImages(0);

    var element = document.getElementById('stockImageDiv');
    element.style.display = "none";
  }

  loadExistingStocks() {
    this.stockService.ReturnStocks(-999).subscribe(response => {
      this.stockList = response.data;
    });
  }

  loadExistingStockWiseImages(stock : number) {
    this.StockWiseImagesService.ReturnStocksWiseImages(-999,stock).subscribe(response => {
      this.StockWiseImagesList = response.data
      this.dataSource = new MatTableDataSource(this.StockWiseImagesList);
      console.log('stockList', response)
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        $('.slide').addClass('is-loaded');
      }, 500);
    });
  }

  selectDataToForm(row: any) {
    console.log('start', row)
    this.StockWiseImagesForm.patchValue({
      imageID: row.imageID,
      stockID: row.stockID,
      title: row.title,
      imageURL: row.imageURL,
    });
    this.updateDate.oldData = this.StockWiseImagesForm.value;
    this.OperationBtnText = "Update";

    setTimeout(() => {
      this.image = 'data:image/jpeg;base64,' + row.imageData;

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

    this.stockWiseImages.userID = this.userID;
    this.stockWiseImages.imageID = row.imageID;
    this.stockWiseImages.title = row.title;
    this.stockWiseImages.stockID = row.stockID;
    this.stockWiseImages.imageData = "";
    this.stockWiseImages.imageURL = this.StockWiseImagesForm.value.imageURL;
    console.log('districtObject', this.stockWiseImages)

    this.StockWiseImagesService.DeleteStockWiseImages(this.stockWiseImages)
      .subscribe(data => {
        console.log('districtObject', data)
        if (data.code == "1000") {
          this.alertService.showSuccess('Successfully deleted')
          this.clearForm();
          this.loadExistingStockWiseImages(this.stockWiseImages.stockID);
          this.StockWiseImagesForm.patchValue({
            stockID: this.stockWiseImages.stockID
          });
        }
        else {
          this.alertService.showError(data.description)
        }
      }
      );
  }

}
