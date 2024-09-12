import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ModalComponent} from "@app/components/ui/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'memopus';

  constructor(private router: Router) {}


  async ngOnInit() {
    //Route to the board page
    await this.router.navigate(['/board']);
  }
}
