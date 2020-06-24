import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { MiddlePanelComponent } from './components/middle-panel/middle-panel.component';
import { ProgressBarModalComponent } from './components/progress-bar-modal/progress-bar-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    ProgressComponent,
    LeftPanelComponent,
    MiddlePanelComponent,
    ProgressBarModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    ProgressBarModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
