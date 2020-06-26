import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { FileuploadService } from 'src/app/Services/fileupload.service';
import { ProgressBarModalComponent } from 'src/app/components/progress-bar-modal/progress-bar-modal.component';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.scss']
})

export class MiddlePanelComponent implements OnInit {

  @ViewChild("MiddlePanel", { static: false, read: ViewContainerRef }) middlePanelComponentRef: ViewContainerRef;
  
  constructor(private fileuploadService: FileuploadService, 
              private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit() {
  }

  /**
   * on file drop handler
  */
  onFileDropped($event: any) {
    this.fileuploadService.prepareFilesList($event);
    let resolver = this.componentFactoryResolver.resolveComponentFactory(ProgressBarModalComponent);
    let componentFactory = this.middlePanelComponentRef.createComponent(resolver);
  }
}