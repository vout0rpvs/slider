import { Component, forwardRef, Input, OnInit, Optional} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

export type TSliderControlsValue = {min : number, max: number};

@Component({
  selector: 'circular-slider-input',
  template: `
    <figure class="slider-container">
        <div id="slider"></div>
        <slider-labels [labels]="rangeLabels"></slider-labels>
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
  @Input() sliderControlsValue : TSliderControlsValue = {min : 0, max: 0};

  public rangeLabels : Array<number> = [0, 25, 50, 75, 100];
  private slider : any;
  private handleChangesSubject$ : Subject<string> = new Subject();
  private subList : Subscription[] = [];

  ngOnInit() {
    this.generateSlider();
    this.subList.push(
      this.handleChangesSubject$
      .pipe(
        map(value => {
          const split = value.split(',');
          return {min: +split[0], max: +split[1]}
        })
      ).subscribe((sliderControlsValue) => {
        this.sliderControlsValue = sliderControlsValue;
        this.propagateChange(this.sliderControlsValue);
      })
    );
  }

  writeValue(value : TSliderControlsValue) : void {
   this.sliderControlsValue = value
   this.setSliderHandles();
  }

  registerOnChange(fn : any) : void {
    this.propagateChange = fn;
  }

  propagateChange = (_: any) => {};

  registerOnTouched() : void {}
 
  ngOnDestroy() : void {
    this.subList.forEach(sub => sub.unsubscribe());
  }

  private setSliderHandles() : void {
    this.slider.setValue(`${this.sliderControlsValue.min}, ${this.sliderControlsValue.max}`);
  }

  private generateSlider() : void {
    $("#slider").roundSlider({
      sliderType: "range",
      handleShape: "round",
      radius: 120,
      width: 24,
      value: `${this.sliderControlsValue.min},${this.sliderControlsValue.max}`,
      circleShape: "pie",
      startAngle: 315,
      lineCap: "round",
      editableTooltip: false,
      min: 0,
      max: 100,
      
      change: ({value} : {value : string}) => this.handleChangesSubject$.next(value)
    });

    this.slider = $("#slider").data("roundSlider");
  }
}
