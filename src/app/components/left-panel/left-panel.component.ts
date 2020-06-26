import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FileuploadService } from 'src/app/Services/fileupload.service';
import { ProgressBarModalComponent } from 'src/app/components/progress-bar-modal/progress-bar-modal.component';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})

export class LeftPanelComponent implements OnInit {

  @ViewChild("LeftPanel", { static: false, read: ViewContainerRef }) leftPanelComponentRef: ViewContainerRef;
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  constructor(private fileuploadService: FileuploadService, 
              private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit() {
  }

  /**
   * on file drop handler
  */
  onFileDropped($event: any) {
    this.fileDropEl.nativeElement.value = "";
    this.fileuploadService.prepareFilesList($event);
    let resolver = this.componentFactoryResolver.resolveComponentFactory(ProgressBarModalComponent);
    let componentFactory = this.leftPanelComponentRef.createComponent(resolver);
  }
}