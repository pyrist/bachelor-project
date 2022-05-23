import { Component, OnInit } from '@angular/core';
import { categories } from '../categories';
import {Router} from "@angular/router";

@Component({
  selector: 'app-feature-selection',
  templateUrl: './feature-selection.component.html',
  styleUrls: ['./feature-selection.component.css']
})
export class FeatureSelectionComponent implements OnInit {
  categories = categories

  constructor(private router: Router) { }

  goToCategoryDetails(linkname: string) {
    this.router.navigateByUrl('/categories/' + linkname);
  }

  ngOnInit(): void {
  }

}
