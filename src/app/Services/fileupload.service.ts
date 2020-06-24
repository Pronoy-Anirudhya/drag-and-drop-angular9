import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FileuploadService {

  public files: any[];

  constructor() {
    this.files = [];
  }

  addFiles(file: any) {
    this.files.push(file);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  getFiles(): any[] {
    return this.files;
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const file of files) {
      file.progress = 0;
      this.addFiles(file);
    }
  }
}