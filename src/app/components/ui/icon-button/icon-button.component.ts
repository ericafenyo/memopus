import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
  @Input() icon!: string;
  @Output() click = new EventEmitter();

  handleClick() {
    this.click.emit();
  }
}
