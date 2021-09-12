import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() title : string;
  @Input() value : number;
  @ViewChild('input') inputEl : ElementRef<HTMLInputElement>

  writeValue(value : number): void {
    this.value = value;
  }

  onChange(event : any) : void {
    
    if(event.target.value >= 100) {
      this.value = 100;
      this.inputEl.nativeElement.value = `${this.value}`;
    } else {
      this.value = event.target.value;
    }
    this.propagateChange(this.value)
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  propagateChange : (_ : any) => {};
}
