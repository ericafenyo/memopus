import {Component, Input} from '@angular/core';
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
  @Input() classes: string = "";
  @Input() disabled!: boolean;
}
