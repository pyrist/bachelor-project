import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, categories } from '../../categories';
import { Apollo } from 'apollo-angular';
import { saveAs } from "file-saver";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category | undefined;
  loading = false;
  rounds: number | undefined;
  constructor(private apollo: Apollo, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categoryLinknameFromRoute = String(routeParams.get('categoryLinkname'));
    this.category = categories.find(category => category.linkname === categoryLinknameFromRoute);
  }

  retrieveCsv(categoryName: string | undefined) {
    this.http.get("http://localhost:4000/api/csvRequest/category/" + categoryName, { responseType: 'blob' })
      .subscribe(
      (response:any) => {
        saveAs(response,  `${categoryName}.csv`)
      });
    }
  }

