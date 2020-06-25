import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})

export class DndDirective {
  @HostBinding('class.fileover') fileDragOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) public onDragOver(event: any) {
    this.handleEvent(event, true);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event: any) {
    this.handleEvent(event, false);
  }

  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(event: any) {
    this.handleEvent(event, false);
    
    let files = event.dataTransfer.files;

    if (files.length > 0)
      this.fileDropped.emit(files);
  }

  handleEvent(event: any, fileDragOver: boolean) {
    event.preventDefault();
    event.stopPropagation();
    this.fileDragOver = fileDragOver;
  }
}