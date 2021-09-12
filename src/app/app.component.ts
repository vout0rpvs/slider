import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, iif, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TSliderAvailableRange } from './circular-slider-input/circular-slider-input.component';
import { SliderService } from './circular-slider-input/slider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public reactiveForm : FormGroup;
  private subList : Subscription[] = [];

  constructor(private fb: FormBuilder,
              private sliderService: SliderService) {}

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      rangeSelection: {minSelected: 10, maxSelected: 30},
      minRange: null,
      maxRange: null
    })

    this.subList.push(this.getAvailableRange()
      .subscribe(result => this.sliderService.addToRangeStore(result)));
  }

  private getAvailableRange() : Observable<TSliderAvailableRange> {
    return combineLatest([
      this.reactiveForm.get('minRange').valueChanges, 
      this.reactiveForm.get('maxRange').valueChanges
    ])
    .pipe(
      switchMap(result => 
        iif(() => 
          result[0] < result[1], 
          of({minRange: result[0], maxRange: result[1]}))
        )
      )
  }

  ngOnDestroy() : void {
    this.subList.forEach(sub => sub.unsubscribe());
  }
}
