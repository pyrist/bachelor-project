import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-variable-display',
  templateUrl: './simple-variable-display.component.html',
  styleUrls: ['./simple-variable-display.component.css']
})
export class SimpleVariableDisplayComponent implements OnInit {
  @Input() input: any | undefined
  @Input() description: string | undefined
  constructor() { }

  ngOnInit(): void {
  }
}
