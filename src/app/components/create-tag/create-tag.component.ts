import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "@app/components/ui/modal/modal.component";

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

  onSubmit($event: SubmitEvent) {

  }

  onDismiss() {

  }
}
