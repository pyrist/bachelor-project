import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sensibility-score-detail-display',
  templateUrl: './sensibility-score-detail-display.component.html',
  styleUrls: ['./sensibility-score-detail-display.component.css']
})
export class SensibilityScoreDetailDisplayComponent implements OnInit {
  @Input() score!: number | undefined
  @Input() description!: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
