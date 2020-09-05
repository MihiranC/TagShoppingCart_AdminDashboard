import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})





export class DistrictComponent implements OnInit {

  constructor() { }
  
  ELEMENT_DATA: any[] = [
    {position: 1, Code: 'COL', name: 'Colombo'},
    {position: 2, Code: 'KAN', name: 'Kandy'},
    {position: 3, Code: 'GAL', name: 'Galle'},
    {position: 4, Code: 'JAF',  name: 'Jaffna'},
    {position: 5, Code: 'HAM',  name: 'Hambanthota'},
    {position: 6, Code: 'KAL',  name: 'Kalutara'},
  ];

  displayedColumns: string[] = ['position', 'Code', 'name'];
  dataSource = this.ELEMENT_DATA;

  ngOnInit(): void {
    
  }

}
