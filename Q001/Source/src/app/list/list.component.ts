import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormData } from '../../assets/formData';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  firstName:string = '';
  dataList:FormData[] = [];
  
  constructor(){
    this.dataList.push(JSON.parse(localStorage.getItem("data")!));
    console.log(this.firstName);
    
  }
  filterByFirstName(){
    this.dataList = this.dataList.filter((e) => (e.firstName.toLowerCase() == this.firstName.toLowerCase()))
  }

  filterByMinAge(){
    this.dataList = this.dataList.filter((e) => (e.dateOfBirth ))
  }
}
