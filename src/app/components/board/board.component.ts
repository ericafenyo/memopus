import {Component} from '@angular/core';
import {LucideAngularModule, CirclePlus, icons} from "lucide-angular";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [LucideAngularModule],

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  constructor() {

  }
}
