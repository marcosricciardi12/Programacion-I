import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input() childMessage: any;
  constructor() { }

  ngOnInit(): void {
  }

  async sendMessagePage(page:any) {
    this.messageEvent.emit(page)
    await delay(10);
    console.log('Mensaje del padre al hijo: ', this.childMessage.pages)
  }

}
