import { Component } from '@angular/core';
import { categories } from '../../categories';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css']
})
export class CategorySelectionComponent {
  categories = categories

  constructor(private router: Router) { }

  goToCategoryDetails(linkname: string) {
    this.router.navigateByUrl('/categories/' + linkname);
  }
}
