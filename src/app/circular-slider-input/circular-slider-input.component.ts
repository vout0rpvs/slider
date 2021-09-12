import { Component, forwardRef, Input, OnInit, Optional} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { SliderService } from './slider.service';

export type TSliderControlsValue = {minSelected : number, maxSelected: number};
export type TSliderAvailableRange = {minRange : number, maxRange : number}

@Component({
  selector: 'circular-slider-input',
  template: `
    <figure class="slider-container">
        <div id="slider"></div>
    </figure>
  `,  
  styleUrls: ['./circular-slider-input.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CircularSliderInputComponent),
      multi: true
    }
  ]
})

export class CircularSliderInputComponent implements OnInit, ControlValueAccessor {
  @Input() sliderControlsValue : TSliderControlsValue = {minSelected : 0, maxSelected: 0};

  private slider : any;
  private handleChangesSubject$ : Subject<string> = new Subject();
  private subList : Subscription[] = [];
  constructor(private rangeStore: SliderService) {}

  ngOnInit() {
    this.generateSlider();
    this.subList.push(
    this.handleChangesSubject$
    .pipe(
      map(value => {
        const split = value.split(',');
        return {minSelected: +split[0], maxSelected: +split[1]}
      })
    ).subscribe((sliderControlsValue) => {
      this.sliderControlsValue = sliderControlsValue;
      this.propagateChange(this.sliderControlsValue);
    }),
    this.rangeStore.getRangeStore().subscribe(result => {
      this.slider.option('min', result.minRange);
      this.slider.option('max', result.maxRange);
    })
    );
  }

  writeValue(value : TSliderControlsValue) {
   this.sliderControlsValue = value
   this.setSliderHandles();
  }

  registerOnChange(fn : any) {
    this.propagateChange = fn;
  }

  propagateChange = (_: any) => {};

  registerOnTouched() {}
 
  ngOnDestroy() : void {
    this.subList.forEach(sub => sub.unsubscribe());
  }

  private setSliderHandles() : void {
    this.slider.setValue(`${this.sliderControlsValue.minSelected}, ${this.sliderControlsValue.maxSelected}`);
  }

  private generateSlider() : void {
    $("#slider").roundSlider({
      sliderType: "range",
      handleShape: "round",
      radius: 120,
      width: 24,
      value: `${this.sliderControlsValue.minSelected},${this.sliderControlsValue.maxSelected}`,
      circleShape: "pie",
      startAngle: 313,
      lineCap: "round",
      editableTooltip: false,
      
      change: ({value} : {value : string}) => this.handleChangesSubject$.next(value)
    });

    this.slider = $("#slider").data("roundSlider");
  }
}
