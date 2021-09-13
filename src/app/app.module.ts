import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CircularSliderInputComponent } from './circular-slider-input/circular-slider-input.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { SliderLabelsComponent } from './circular-slider-input/slider-labels/slider-labels.component';

@NgModule({
  declarations: [
    AppComponent,
    CircularSliderInputComponent,
    CustomInputComponent,
    SliderLabelsComponent
  ],
  imports: [
    BrowserModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
