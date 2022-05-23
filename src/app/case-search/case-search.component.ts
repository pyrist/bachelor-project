import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent implements OnInit {
  @Input() caseId?: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigateByUrl('/patients/' + this.caseId);
  }

}
