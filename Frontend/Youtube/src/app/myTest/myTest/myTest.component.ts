import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-myTest',
  templateUrl: './myTest.component.html',
  styleUrls: ['./myTest.component.css']
})
export class MyTestComponent implements OnInit {
  isLoading = false;
  constructor() { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log("Outt");
      return;
    }
  }

}
