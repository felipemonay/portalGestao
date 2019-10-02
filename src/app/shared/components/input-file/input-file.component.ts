
import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

export class FileManager {
  name: string;
  extension: string;
  base64Data: string;

}

@Component({
  selector: 'input-file',
  templateUrl: 'input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})

export class InputFileComponent implements OnInit, OnChanges {

  @ViewChild('fileinput') fileinput: ElementRef;
  @Output() select = new EventEmitter();
  @Input('image') image: string;
  @Input('label') label: string = 'Selecione o Arquivo';
  fileCurrent: FileManager = new FileManager();
  file: any;
  localChange: boolean = false;

  constructor() {
  }

  ngOnChanges(changes): void {
    if (!this.localChange) {
      let image = changes.image.currentValue;
      this._populatePreLoadImage(image);
    }
  }

  ngOnInit(): void {
    this._populatePreLoadImage(this.image);
  }

  selectFile(): void {
    this.fileinput.nativeElement.click();
  }


  handleFileSelect(evt): void {
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {

      this.localChange = true;

      this.fileCurrent.name = file.name;
      let ext = file.name.split('.').pop();
      this.fileCurrent.extension = ext;
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    else {
      this.fileCurrent = new FileManager();
    }
  }

  private _populatePreLoadImage(image: string): void {
    if (image) {
      const type = image.substr(0, 4);

      if ( type === 'data'){
        let file = image.split(',');
        let ext = file[0].split('/');
        ext = ext[1].split(';');

        this.fileCurrent.extension = ext[0];
        this.fileCurrent.name = 'image.' + ext[0];
        this.fileCurrent.base64Data = image;

      } else if (image) {
        let ext = image.split('.');
        this.fileCurrent.extension = ext[1];
        this.fileCurrent.name = image;
        this.fileCurrent.base64Data = `${environment.storage_url}/${image}`;
      }
    }
  }

  private _handleReaderLoaded(readerEvt): void {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    this.fileCurrent.base64Data = `data:image/${this.fileCurrent.extension};base64,${base64textString}`;
    console.log(this.fileCurrent.name);
    this.select.emit(this.fileCurrent);
  }

}
