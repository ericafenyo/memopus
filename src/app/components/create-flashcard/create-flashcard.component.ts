import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {Store} from "@app/core/services/store.service";
import {randomUUID} from "@app/utilities";
import {Column} from "@app/models/column";
import {Tag} from "@app/models/tag";
import {ToastrService} from "ngx-toastr";

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
  @Input() column!: Column;
  @Input() tag!: Tag;

  @Output() dismiss = new EventEmitter();

  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private store: Store, private toast: ToastrService) {}

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.store.actions.createCard({
      id: randomUUID(),
      question: this.question.value ?? "",
      answer: this.answer.value ?? "",
      description: this.description.value ?? "",
      tagId: this.tag.id,
      columnId: this.column.id
    }).subscribe({
      next: () => {
        this.dismiss.emit();
        this.toast.success("Flashcard created successfully");
      },
      error: (error) => {
        this.toast.error("An error occurred while creating the flashcard");
        console.error(error);
      }
    })
  }
}
