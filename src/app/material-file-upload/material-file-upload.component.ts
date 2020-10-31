import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest,
         HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-material-file-upload',
  templateUrl: './material-file-upload.component.html',
  styleUrls: ['./material-file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
          state('in', style({ opacity: 100 })),
          transition('* => void', [
                animate(300, style({ opacity: 0 }))
          ])
    ])
]
})
export class MaterialFileUploadComponent implements OnInit {

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
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = (event : any) => {
              for (let index = 0; index < fileUpload.files.length; index++) {
                    const file = fileUpload.files[index];

                      var reader = new FileReader();

                      reader.readAsDataURL(event.target.files[index]); // read file as data url

                      reader.onload = (event) => { // called once readAsDataURL is completed
                        this.files.push({ data: file, state: 'in',
                        inProgress: false, progress: 0, canRetry: false, canCancel: true, ImageData : event.target.result });
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

    file.inProgress = true;
    for(let i:number=0;i<=100;i= i+1){
      setTimeout(() => {
        file.progress = Math.round(i);
        if(i==100){
          this.removeFileFromArray(file);
          this.complete.emit('Completed');
        }
      }, 100);
    }
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

  url = '';
}


export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
  ImageData : any;
}