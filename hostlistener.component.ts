import { Component, HostListener } from '@angular/core';

@Component({
  template: '<h1>host listener component</h1>',
})
export class YourComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Handle the keydown event here
    console.log(event.key);
  }

}
