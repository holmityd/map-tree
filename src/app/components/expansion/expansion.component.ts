import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent {
    @Input() show = false;
    @Input() title?: string;
    @Input() icon?: string;
    @Output() onToggle = new EventEmitter<boolean>();
    toggle(){
      this.show = !this.show;
      this.onToggle.emit(this.show);
    }
}
