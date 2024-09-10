import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";

@Component({
  selector: 'app-edit-flashcard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalComponent
  ],
  templateUrl: './edit-flashcard.component.html',
  styleUrl: './edit-flashcard.component.css'
})
export class EditFlashcardComponent {
  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  onSubmit($event: SubmitEvent) {

  }

  onDismiss() {}
}
