import {BehaviorSubject, map, tap} from "rxjs";
import {Flashcard} from "@app/interfaces/flashcard";
import {Injectable} from "@angular/core";
import {CardService, UpdateFlashCardOptions} from "@app/services/card.service";
import {Position} from "@app/enums/position";
import {Tag} from "@app/interfaces/tag";
import {Column} from "@app/interfaces/column";

@Injectable({
  providedIn: 'root'
})

export class Store {
  #cards = new BehaviorSubject<Flashcard[]>([]);
  #columns = new BehaviorSubject<Column[]>([]);
  #tags = new BehaviorSubject<Tag[]>([]);

  cards = this.#cards.asObservable();
  columns = this.#columns.asObservable();
  tags = this.#tags.asObservable();

  constructor(private service: CardService) {
    this.service.getCards().subscribe(cards => this.#cards.next(cards));
    this.service.getColumns().subscribe(columns => this.#columns.next(columns));
  }

  private moveCard = (card: Flashcard, position: Position) => {
    this.#columns.pipe(
      tap(columns => {
        const index = columns.findIndex((c) => c.id === card.column.id);
        const searchIndex = position === Position.LEFT ? index - 1 : index + 1;

        // Check if the searchIndex is valid
        if (searchIndex < 0 || searchIndex >= columns.length) {
          // Do nothing yet. We should probably throw an error here
        }

        // Find the column to move the card to
        // Find the cards in the new column
        card.column = columns[searchIndex];

        const cards = this.#cards.value.map(c => {
          if (c.id === card.id) {
            return card;
          }
          return c;
        })

        // Update the cards
        this.#cards.next(cards);
        console.log(card);
        const options: UpdateFlashCardOptions = {
          id: card.id,
          question: card.question,
          answer: card.answer,
          columnId: card.column.id,
          tagId: card.tag.id
        }
        this.service.updateCard(options).subscribe();

        // Update the card in the database

      })
    ).subscribe()
  }

  actions = {
    moveCard: this.moveCard
  }
}
