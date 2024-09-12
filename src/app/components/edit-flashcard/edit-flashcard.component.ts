import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {Store} from "@app/core/services/store.service";
import {ToastrService} from "ngx-toastr";
import {Flashcard} from "@app/models/flashcard";

@Component({
  selector: 'app-edit-flashcard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './edit-flashcard.component.html',
  styleUrl: './edit-flashcard.component.css'
})
export class EditFlashcardComponent implements OnInit {
  @Input() card!: Flashcard;

  @Output() dismiss = new EventEmitter();

  question = new FormControl("", Validators.required);
  answer = new FormControl("", Validators.required);
  description = new FormControl("");

  constructor(private store: Store, private toast: ToastrService) {}

  ngOnInit() {
    this.question.setValue(this.card.question);
    this.answer.setValue(this.card.answer);
    this.description.setValue(this.card.description ?? "");
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.store.actions.updateCard({
      id: this.card.id,
      question: this.question.value ?? "",
      answer: this.answer.value ?? "",
      description: this.description.value ?? "",
      tagId: this.card.tag.id,
      columnId: this.card.column.id
    }).subscribe({
      next: () => {
        this.dismiss.emit();
        this.toast.success("Flashcard updated successfully");
      },
      error: (error) => {
        this.toast.error("An error occurred while updating the flashcard");
        console.error(error);
      }
    })
  }

  deleteCard(card: Flashcard) {
    this.store.actions.deleteCard(card).subscribe({
      next: () => {
        this.dismiss.emit();
        this.toast.success("Flashcard deleted successfully");
      },
      error: (error) => {
        this.toast.error("An error occurred while deleting the flashcard");
        console.error(error);
      }
    })
  }
}
