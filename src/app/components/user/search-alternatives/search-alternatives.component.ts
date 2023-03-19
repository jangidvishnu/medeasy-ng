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

  prescriptions = [
    [
      {
        "category": "TABLET",
        "composition": "{\"paracetamol\" : 250,\"ceitrizine\":10,\"caffeine\":25,\"pdhl\":25}",
        "compounds": "paracetamol,ceitrizine,caffeien,pdhl",
        "created": "Sun, 19 Mar 2023 00:16:21 GMT",
        "id": 2,
        "manufacturer": "Cipla",
        "name": "Cheston Cold",
        "price": "7",
        "type": "SYNTHETIC",
        "updated": "Sun, 19 Mar 2023 00:25:52 GMT"
      },
      {
        "category": "TABLET",
        "composition": "{\"paracetamol\":650}",
        "compounds": "paracetamol",
        "created": "Sun, 19 Mar 2023 00:29:30 GMT",
        "id": 3,
        "manufacturer": "Mankind",
        "name": "Dolo",
        "price": "5",
        "type": "SYNTHETIC",
        "updated": "Sun, 19 Mar 2023 00:29:30 GMT"
      }
    ]
  ]

  prescriptionAlter = []


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

  searchPrescriptionAlternatives(prescription) {
    prescription && this.medicineService.getAltMedicinesById([...prescription.map((med) => med.id)]).subscribe(
      (res) => {
        if (res.success) {
          this.prescriptionAlter = res.data.alternatives;
        }
        else {
          this.prescriptionAlter = [];
        }
      }
    )
  }

  extractMedicines(prescription) {
    return prescription.map((med) => med.name).join(",");
  }

}
