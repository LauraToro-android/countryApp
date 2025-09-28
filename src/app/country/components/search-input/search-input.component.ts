import { Component, effect, Input, Output, EventEmitter, signal, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() placeholder: string = '';
  @Output() value = new EventEmitter<string>();

  initialValue = input<string>();

  //fijación en el navegador y busqueda desde la barra del navegador
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  // Debounce automático
  debounceEffect = effect((onCleanup) => {
    const val = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(val.trim());
    }, 1000);

    onCleanup(() => clearTimeout(timeout));
  });

  // Emit inmediato (botón o Enter)
  emitNow(val: string) {
    this.value.emit(val.trim());
  }
}
