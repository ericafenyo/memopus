import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title!: string;
  @Output() dismiss = new EventEmitter();

  onDismissed(event: Event) {
    this.dismiss.emit();
  }
}
