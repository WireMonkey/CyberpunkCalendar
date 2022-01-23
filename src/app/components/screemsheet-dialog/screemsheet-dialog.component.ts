import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SimplePdfViewerComponent } from 'simple-pdf-viewer';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-screemsheet-dialog',
  templateUrl: './screemsheet-dialog.component.html',
  styleUrls: ['./screemsheet-dialog.component.css']
})
export class ScreemsheetDialogComponent implements OnInit, AfterViewInit  {

  @ViewChild(SimplePdfViewerComponent) private pdfViewer!: SimplePdfViewerComponent
  
  loadingFile: boolean = true;
  fileName: string = "";
  fileUrl: string = "";

  constructor(private readonly eventService: EventService, private readonly messageService: MessageService, 
    public config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.fileName = config.data.fileName;
    this.fileUrl = eventService.getScreamSheetUrl(this.fileName);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pdfViewer.onLoadComplete.subscribe(() => {
      this.loadingFile = false;
    });

    this.pdfViewer.onError.subscribe(() => {
      this.messageService.add({severity:'error', summary:'Error', detail:`Unable to load ${this.fileName}.pdf`});
      this.ref.close();
    });

    this.pdfViewer.openDocument(this.fileUrl);
  }
}
