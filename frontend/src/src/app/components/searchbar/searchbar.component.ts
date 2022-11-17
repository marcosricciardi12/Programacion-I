import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchForm!: FormGroup;
  message: string = ""
  @Output() messageEvent = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder) { }


  sendMessage(value:any) {
    this.messageEvent.emit(value)
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      value: ['', Validators.required],
   });
  }

  submit() {
    if (this.searchForm.valid) {
        let value = this.searchForm.value.value;
        let page = 1 ;
        this.sendMessage({value, page});
      }
      else{
        let value = null
        this.sendMessage({value});
      }
    }  

}
