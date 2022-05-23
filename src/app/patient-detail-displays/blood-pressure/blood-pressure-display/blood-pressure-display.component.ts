import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blood-pressure-display',
  templateUrl: './blood-pressure-display.component.html',
  styleUrls: ['./blood-pressure-display.component.css']
})
export class BloodPressureDisplayComponent implements OnInit {
  @Input() dia!: number | undefined;
  @Input() sys!: number | undefined;
  @Input() description!: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
