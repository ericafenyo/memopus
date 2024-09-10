import {Component, Input} from '@angular/core';
import {FlashcardComponent} from "@app/components/flashcard/flashcard.component";
import {LucideAngularModule} from "lucide-angular";
import {Column} from "@app/interfaces/column";
import {Flashcard} from "@app/interfaces/flashcard";
import {Position} from "@app/enums/position";
import {Store} from "@app/services/store.service";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [LucideAngularModule, FlashcardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input() column!: Column;
  @Input() cards!: Flashcard[];

  constructor(private store: Store) {}

  moveToRight(card: Flashcard) {
    this.store.actions.moveCard(card, Position.RIGHT);
  }

  moveToLeft(card: Flashcard) {
    this.store.actions.moveCard(card, Position.LEFT);
  }
}
