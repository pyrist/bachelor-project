import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-result-display',
  templateUrl: './table-result-display.component.html',
  styleUrls: ['./table-result-display.component.css']
})
export class TableResultDisplayComponent implements OnInit {
  @Input() normal: number | undefined
  @Input() abnormal: number | undefined
  @Input() severe: number | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
