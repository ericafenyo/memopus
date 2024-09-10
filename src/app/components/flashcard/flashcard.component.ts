import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Flashcard} from "@app/interfaces/flashcard";
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {Column} from "@app/interfaces/column";
import {ProposeAnswerComponent} from "@app/components/propose-answer/propose-answer.component";

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [LucideAngularModule, ModalComponent, ProposeAnswerComponent],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;
  flipped = false;
  isProposingAnswer = false;
  isEditingFlashcard = false;

  @Output() onMoveLeft = new EventEmitter<Flashcard>()
  @Output() onMoveRight = new EventEmitter<Flashcard>()

  moveLeft(card: Flashcard) {
    this.onMoveLeft.emit(card);
  }

  moveRight(card: Flashcard) {
    this.onMoveRight.emit(card);
  }

  handleDismissed(type: "answer" | "edit") {
    if (type === 'answer') {
      this.isProposingAnswer = false;
    } else if (type === 'edit') {
      this.isEditingFlashcard = false;
    }
  }

  proposeAnswer() {
    this.isProposingAnswer = true;
  }

  editFlashcard() {
    this.isEditingFlashcard = true;
  }

  flip() {
    this.flipped = !this.flipped;
  }
}
