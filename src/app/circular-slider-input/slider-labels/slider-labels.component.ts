import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'slider-labels',
  template: `
    <label 
      *ngFor="let label of labels; let i = index" 
      class="quart" 
      [ngClass]="'quart' + i"
    >
      {{label}}
    </label>
  `,
  styleUrls: ['./slider-labels.component.scss']
})
export class SliderLabelsComponent implements OnInit {
  @Input() labels: Array < number > = [];

  ngOnInit(): void {}

}
