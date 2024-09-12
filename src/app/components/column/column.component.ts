import {Component, Input, OnInit, signal} from '@angular/core';
import {FlashcardComponent} from "@app/components/flashcard/flashcard.component";
import {LucideAngularModule} from "lucide-angular";
import {Column} from "@app/models/column";
import {Flashcard} from "@app/models/flashcard";
import {Position} from "@app/core/enums/position";
import {Store} from "@app/core/services/store.service";
import {CreateFlashcardComponent} from "@app/components/create-flashcard/create-flashcard.component";
import {IconButtonComponent} from "@app/components/ui/icon-button/icon-button.component";
import {Tag} from "@app/models/tag";
import {ToastrService} from "ngx-toastr";
import {EditFlashcardComponent} from "@app/components/edit-flashcard/edit-flashcard.component";

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [LucideAngularModule, FlashcardComponent, CreateFlashcardComponent, IconButtonComponent, EditFlashcardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Input() tag!: Tag;
  @Input() cards!: Flashcard[];

  isCreateFlashcard = signal(false);

  constructor(
    private store: Store,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.store.activeTag.subscribe(tag => {
      if (tag) {this.tag = tag}
    });
  }

  set createFlashcard(value: boolean) {
    if (this.tag) {
      this.isCreateFlashcard.set(value);
    } else {
      this.toast.info("Please select a tag first", undefined, {});
    }
  }

  moveToRight(card: Flashcard) {
    this.store.actions.moveCard(card, Position.RIGHT);
  }

  moveToLeft(card: Flashcard) {
    this.store.actions.moveCard(card, Position.LEFT);
  }
}
