import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sliderControl : FormControl;
  public sliderReactiveForm : FormGroup;
  private subList : Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.sliderControl = this.fb.control({
      min: 10, 
      max: 30
    })
    this.sliderReactiveForm = this.fb.group({
      min: 0,
      max: 100
    })

    this.subList.push(
      this.sliderReactiveForm.valueChanges
      .subscribe(({min, max}) => this.sliderControl.setValue({min, max})),

      this.sliderControl.valueChanges
      .subscribe(({min, max}) => {
        this.sliderReactiveForm.setValue({min, max}, {emitEvent: false})
      })
    );
  }

  ngOnDestroy() : void {
    this.subList.forEach(sub => sub.unsubscribe());
  }
}
