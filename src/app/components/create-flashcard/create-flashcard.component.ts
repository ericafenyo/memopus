import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";

@Component({
  selector: 'app-create-flashcard',
  standalone: true,
  imports: [
    FormsModule,
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-flashcard.component.html',
  styleUrl: './create-flashcard.component.css'
})

export class CreateFlashcardComponent {
  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  onSubmit($event: SubmitEvent) {

  }

  onDismiss() {

  }
}
