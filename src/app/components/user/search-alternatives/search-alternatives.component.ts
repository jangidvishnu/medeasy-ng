import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine/medicine.service';

@Component({
  selector: 'app-search-alternatives',
  templateUrl: './search-alternatives.component.html',
  styleUrls: ['./search-alternatives.component.css']
})
export class SearchAlternativesComponent implements OnInit {

  MODES = {
    INDIVIDUAL: "individual",
    PRESC: "presc"
  };

  activeMode = this.MODES.INDIVIDUAL;


  suggestions: any = [];
  searchResults: any = [];
  searchBoxValue = "";

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
  }

  setActiveMode(mode) {
    this.activeMode = mode;
  }

  searchMedicinesByName(name) {
    this.searchBoxValue = name;
    name && name.length >= 2 && this.medicineService.getMedicinesByName(name).subscribe(
      (res) => {
        if (res.success) {
          this.suggestions = res.data.medicines;
        }
        else {
          this.suggestions = [];
        }
      }
    )
  }

  searchAlternative(medicine) {
    medicine.id && this.medicineService.getAltMedicinesById(medicine.id).subscribe(
      (res) => {
        if (res.success) {
          this.searchBoxValue = medicine.name;
          this.searchResults = res.data.alternatives;
        }
        else {
          this.searchResults = [];
        }
      }
    )
  }
}
