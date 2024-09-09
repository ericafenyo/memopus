import {Component, Input, signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Flashcard} from "@app/interfaces/flashcard";
import {ModalComponent} from "@app/components/ui/modal/modal.component";

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [LucideAngularModule, ModalComponent],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;
  flipped = false;
  isProposingAnswer = false;
  isEditingFlashcard = false;

  onDismissModal(type: 'answer' | 'edit') {
    if (type === 'answer') {
      this.isProposingAnswer = false;
    } else if (type === 'edit') {
      this.isEditingFlashcard = false;
    }
  }

  flip() {
    this.flipped = !this.flipped;
  }
}
