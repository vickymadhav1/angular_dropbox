import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from "../../shared-service.service";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  today: Date = new Date();

  stateForm: FormGroup;
  favorites :any [];
  completeText = new FormControl('');
  favorite = { code: "", description: "" }

  showDropDown = false;
  states = [];
  subscription;
  userName1;

  constructor(private fb: FormBuilder,private sharedService:SharedService ) {
    this.initForm()
  }

  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }
  ngOnInit() {
   
  }

  selectValue(value) {
    this.stateForm.patchValue({ "search": value });
    this.showDropDown = false;
  }
  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  openDropDown() {
    this.showDropDown = false;
  }

  getSearchValue() {
    return this.stateForm.value.search;
  }
  ngAfterViewInit() {
    // Get updated data
    this.subscription = this.sharedService.getName().subscribe((data) => {
      if (data) {
        this.userName1 = data;
      }
    });
  }
  saveName(_event) {
    let inputValue = document.querySelector('input[name="userName"]');
    this.userName1 = inputValue.value;
    // console.log(inputValue.value)
    localStorage.setItem('name', this.userName1);
    this.states.push(this.userName1);
    this.sharedService.setName(this.userName1);
  }
  removeItem(i): void {
    this.states.splice(i);
  }

}

