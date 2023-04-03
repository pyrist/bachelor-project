import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent{
  @Input() caseId?: number;

  constructor(private router: Router) { }

  search() {
    this.router.navigateByUrl('/patients/' + this.caseId);
  }
}
