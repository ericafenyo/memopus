import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ModalComponent} from "@app/components/ui/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'memopus';
}
