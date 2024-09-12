import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Flashcard} from "@app/models/flashcard";
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {ProposeAnswerComponent} from "@app/components/propose-answer/propose-answer.component";
import {IconButtonComponent} from "@app/components/ui/icon-button/icon-button.component";
import {EditFlashcardComponent} from "@app/components/edit-flashcard/edit-flashcard.component";

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [LucideAngularModule, ModalComponent, ProposeAnswerComponent, IconButtonComponent, EditFlashcardComponent],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;

  @Output() onMoveLeft = new EventEmitter<Flashcard>()
  @Output() onMoveRight = new EventEmitter<Flashcard>()

  flipped = false;
  isAnswer = signal(false);
  isEdit = signal(false);

  moveLeft(card: Flashcard) {
    console.log("moveLeft", card);
    this.onMoveLeft.emit(card);
  }

  moveRight(card: Flashcard) {
    console.log("moveRight", card);
    this.onMoveRight.emit(card);
  }

  flip() {
    this.flipped = !this.flipped;
  }
}
