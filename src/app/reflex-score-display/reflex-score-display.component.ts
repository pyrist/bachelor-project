import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reflex-score-display',
  templateUrl: './reflex-score-display.component.html',
  styleUrls: ['./reflex-score-display.component.css']
})
export class ReflexScoreDisplayComponent implements OnInit {
  @Input() input: number | undefined
  @Input() description!: string

  constructor() { }

  ngOnInit(): void {
  }

}
