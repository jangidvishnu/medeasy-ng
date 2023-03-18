import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-alternatives',
  templateUrl: './search-alternatives.component.html',
  styleUrls: ['./search-alternatives.component.css']
})
export class SearchAlternativesComponent implements OnInit {

  searchResults: any = [{
    name: "paracip",
    manufacturer: "cipla",
    composition: "paracetamol"
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
