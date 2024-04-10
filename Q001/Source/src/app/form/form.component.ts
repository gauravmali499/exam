import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateDetail } from '../../assets/state-detail';
import { FormData } from '../../assets/formData';
import jsonData from "../indianStateDetails.json";
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  votingForm!: FormGroup;
  statesJson:any = jsonData;
  states:string[] = []
  selectedState:string='';
  selectedStateId:string = '';
  cities:string[] = [];
  data:FormData[] = [];

  constructor(private router:Router){
    for (let i = 0; i < this.statesJson.length; i++) {
      if (this.statesJson[i].controlId == "stateDropdown") {
        this.states.push(this.statesJson[i].name);
      }
    }   
  }

  onChangeofState(newState: string) {
    this.selectedState = newState; 
    console.log(this.selectedState);
    
    for (let i = 0; i < this.statesJson.length; i++) {
      if(this.selectedState == this.statesJson[i].name){;
        this.selectedStateId = this.statesJson[i].id;
      }
    }
  }

  getCities(){
    for (let i = 0; i < this.statesJson.length; i++) {
      if(parseInt(this.selectedStateId) === this.statesJson[i].parentId){
        this.cities.push(this.statesJson[i].name);
      }
    }
  }

  ngOnInit() {
    this.votingForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'dateOfBirth': new FormControl('', [Validators.required]),
      'gender': new FormControl(''),
      'hobbies': new FormControl(''),
      'state': new FormControl(''),
      'city': new FormControl(''),
      'area': new FormControl(''),
      'salary': new FormControl('')
    });
  }
  registerData(){
    localStorage.setItem('data', JSON.stringify(this.votingForm.value))
    this.data.push(this.votingForm.value)
    this.router.navigate(["/list"])
  }
}
