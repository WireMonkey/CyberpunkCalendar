import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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

  constructor(private readonly eventService: EventService, public config: DynamicDialogConfig) {
    this.fileName = config.data.fileName;
    this.fileUrl = eventService.getScreamSheetUrl(this.fileName);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.pdfViewer.onLoadComplete.subscribe(() => {
      this.loadingFile = false;
    });

    this.pdfViewer.openDocument(this.fileUrl);
  }
}
