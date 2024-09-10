import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Flashcard} from "@app/interfaces/flashcard";

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

  isComparing: boolean = false;
  answer = new FormControl<string>("answer", [Validators.required]);

  handleDismiss() {
    this.dismiss.emit();
  }

  compare() {
    this.isComparing = true;
  }


  onSubmit(event: SubmitEvent) {
    event.preventDefault()
  }
}
