import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Flashcard} from "@app/models/flashcard";

@Component({
  selector: 'app-propose-answer',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './propose-answer.component.html',
  styleUrl: './propose-answer.component.css'
})

export class ProposeAnswerComponent {
  @Input() card!: Flashcard;
  @Output() dismiss = new EventEmitter();

  submitting: boolean = false;
  isCorrect: boolean = false;

  answer = new FormControl<string>("", [Validators.required]);

  onSubmit(event: SubmitEvent) {
    event.preventDefault()
    this.submitting = true;
    this.isCorrect = this.answer.value === this.card.answer;
  }
}
