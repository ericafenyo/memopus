import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Flashcard} from "@app/interfaces/flashcard";
import {CardService} from "@app/services/card.service";
import {ColumnComponent} from "@app/components/column/column.component";
import {Column} from "@app/interfaces/column";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [LucideAngularModule, ColumnComponent],

  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  columns!: Column[];
  cards!: Flashcard[];

  constructor(private service: CardService) {}

  ngOnInit() {
    this.service.getCards().subscribe(cards => {this.cards = cards});
    this.service.getColumn().subscribe(columns => {this.columns = columns});
  }

  findCardsBy(column: Column) {
    return this.cards.filter(card => card.column.label === column.label);
  }
}
