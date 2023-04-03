import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-yes-no-detail-display',
  templateUrl: './simple-yes-no-detail-display.component.html',
  styleUrls: ['./simple-yes-no-detail-display.component.css']
})
export class SimpleYesNoDetailDisplayComponent implements OnInit {
  @Input() input: number | undefined
  @Input() description: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
