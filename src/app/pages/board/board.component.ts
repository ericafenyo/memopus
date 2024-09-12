import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Flashcard} from "@app/models/flashcard";
import {CardService} from "@app/core/services/card.service";
import {ColumnComponent} from "@app/components/column/column.component";
import {Column} from "@app/models/column";
import {Store} from "@app/core/services/store.service";
import {TagsComponent} from "@app/components/tags/tags.component";
import {Tag} from "@app/models/tag";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [LucideAngularModule, ColumnComponent, TagsComponent],

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  // We will store cards that are filtered by tag here.
  // When no tag is selected, cards will be equal to #cards.
  cards!: Flashcard[];
  columns!: Column[];
  tag!: Tag;

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.cards.subscribe(cards => {this.cards = cards});
    this.store.columns.subscribe(columns => {this.columns = columns});
    this.store.activeTag.subscribe(tag => {
      if (tag) {
        this.tag = tag;
      }
    });
  }

  findCardsBy(column: Column) {
    return this.cards.filter(card => card.column.label === column.label);
  }
}
