import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'input-component',
  templateUrl: './input-component.component.html',
  styles: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponentComponent),
      multi: true
    }
  ]
})
export class InputComponentComponent {

  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string | null = null;
  @Input() name: string = '';

  value: string = '';
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if you need to handle the disabled state
  }

  onInput(event: any): void {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
