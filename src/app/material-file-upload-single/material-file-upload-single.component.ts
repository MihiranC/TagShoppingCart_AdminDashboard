import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
  HttpClient, HttpResponse, HttpRequest,
  HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { ResizeImageService } from '../Services/ResizeImage.service';
import { ResizeImage } from '../Models/ResizeImage';

@Component({
  selector: 'app-material-file-upload-single',
  templateUrl: './material-file-upload-single.component.html',
  styleUrls: ['./material-file-upload-single.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MaterialFileUploadSingleComponent implements OnInit {

  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
      By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<FileUploadModel>();


  @Input() resizeToWidth = 3000;
  @Input() resizeToHeight = 1000;

  files: Array<FileUploadModel> = [];
  ImageResizeObj: ResizeImage = new ResizeImage();
  ImageResize: ResizeImage[] = []

  constructor(
    private _http: HttpClient,
    public ResizeImageService: ResizeImageService
  ) { }

  ngOnInit() {
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    var width = this.resizeToWidth;
    var height = this.resizeToHeight;
    fileUpload.onchange = (event: any) => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];

        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[index]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed

          this.files.push({
            data: file, state: 'in',
            inProgress: false, progress: 0, canRetry: false, canCancel: true, ImageData: event.target.result, width: width, height: height
          });
        }

      }
      setTimeout(() => {
        this.uploadFiles();
      }, 500);
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    //file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });


    var ImageResizeObj: ResizeImage = new ResizeImage();

    ImageResizeObj.originalImage = file.ImageData;
    ImageResizeObj.width = file.width;
    ImageResizeObj.height = file.height;

    file.inProgress = true;

    for (let i: number = 0; i <= 75; i = i + 1) {
      setTimeout(() => {
        file.progress = Math.round(i);
      }, 100);
    }
    this.ResizeImageService.Resize(ImageResizeObj)
      .subscribe(data => {
        if (data.code == "1000") {
          for (let i: number = 76; i <= 100; i = i + 1) {
            setTimeout(() => {
              file.progress = Math.round(i);
              if (i == 100) {
                file.ImageData = data.data.resizedImage;
                this.removeFileFromArray(file);
                this.complete.emit(file);
              }
            }, 100);
          }
        }
      }
      );
  }


  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}


export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
  ImageData: any;
  width: number;
  height: number;
}
