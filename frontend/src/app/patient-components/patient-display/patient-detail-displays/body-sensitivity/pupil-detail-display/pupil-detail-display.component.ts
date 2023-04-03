import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pupil-detail-display',
  templateUrl: './pupil-detail-display.component.html',
  styleUrls: ['./pupil-detail-display.component.css']
})
export class PupilDetailDisplayComponent {
  @Input() narrow: number | undefined
  @Input() dyscoria: number | undefined
  @Input() notDeterminable: number | undefined
  @Input() wide: number | undefined
  @Input() middle: number | undefined
  @Input() description: string | undefined
  allValuesZero = false;

  constructor() { }

  ngOnChanges(model: any) {
    this.allValuesZero = (this.narrow != 1 || this.dyscoria != 1 || this.middle != 1 || this.notDeterminable != 1 || this.wide != 1 );
  }
}
