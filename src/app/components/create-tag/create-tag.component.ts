import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";
import {Store} from "@app/core/services/store.service";
import {ToastrService} from "ngx-toastr";
import {randomUUID} from "@app/utilities";

@Component({
  selector: 'app-create-tag',
  standalone: true,
  imports: [
    FormsModule,
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.css'
})
export class CreateTagComponent {
  label = new FormControl('', Validators.required);
  @Output() dismiss = new EventEmitter<Event>();

  constructor(
    private store: Store,
    private toast: ToastrService
  ) {}

  onSubmit() {
    this.store.actions.createTag({
      id: randomUUID(),
      label: this.label.value ?? ""
    }).subscribe({
      next: () => {
        this.dismiss.emit();
        this.toast.success("Tag created successfully");
      },

      error: (error) => {
        this.toast.error("An error occurred while creating the tag");
        console.error(error);
      }
    })
  }
}
