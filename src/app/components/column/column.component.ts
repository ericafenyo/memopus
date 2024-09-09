import {Component, Input} from '@angular/core';
import {FlashcardComponent} from "@app/components/flashcard/flashcard.component";
import {LucideAngularModule} from "lucide-angular";
import {Column} from "@app/interfaces/column";
import {Flashcard} from "@app/interfaces/flashcard";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [LucideAngularModule, FlashcardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() cards!: Flashcard[]
}
