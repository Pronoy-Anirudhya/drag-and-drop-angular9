import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileuploadService } from 'src/app/Services/fileupload.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-bar-modal',
  templateUrl: './progress-bar-modal.component.html',
  styleUrls: ['../../app.component.scss']
})

export class ProgressBarModalComponent implements OnInit {

  @ViewChild("mymodal", { static: false }) progressBarModalContent: ElementRef<any>;

  private files: any[];
  private progressBarModalOptions: NgbModalOptions;
  private progressBarModalReference: any;
  private isShowDetailUploadInfo: boolean;
  
  constructor(private modalService: NgbModal, 
              private fileuploadService: FileuploadService) { 
    this.progressBarModalOptions = {
      backdrop:false,
      backdropClass:'customBackdrop',
      windowClass: 'custom-class'
    }

    this.isShowDetailUploadInfo = true;
  }

  ngOnInit() {
    this.files = this.fileuploadService.getFiles();
  }

  ngAfterViewInit() {
    this.startProgressBarSimulator();
  }

  startProgressBarSimulator() {
    this.openProgressBarModal();
    this.uploadFilesSimulator(0);
  }

  openProgressBarModal() {
    this.progressBarModalReference = this.modalService.open(this.progressBarModalContent, this.progressBarModalOptions);
  }

  closeProgressBarModal() {
    this.isShowDetailUploadInfo = false;
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }

    this.fileuploadService.deleteFile(index);
    this.files = this.fileuploadService.getFiles();
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        document.getElementById("modal-basic-title").innerHTML = "Completed uploading " + this.files.length + " file(s).";
        setTimeout(() => {
            this.reset();
        }, 2000);
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0)
      return "0 Bytes";
      
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  reset() {
    this.files = [];
    this.isShowDetailUploadInfo = true;
    this.progressBarModalReference.close();
  }
}