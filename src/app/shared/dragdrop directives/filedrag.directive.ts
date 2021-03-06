import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFiledrag]'
})
export class FiledragDirective {

  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();

  @HostBinding('style.background') private background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.background = 'lightgray';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event : any){
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event']) public onDrop(event : any){
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
    let files = event.dataTransfer;
    let filesize = event.dataTransfer.files[0];
    if((filesize.size/1024/1024)<=2){
      let valid_files : Array<File> = files;
      this.filesChangeEmiter.emit(valid_files);
    }
    else
    {
      alert("File should be less than 2MB");
    }
  }

}
