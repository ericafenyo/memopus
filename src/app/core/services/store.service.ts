import {BehaviorSubject, map, tap} from "rxjs";
import {Flashcard} from "@app/models/flashcard";
import {Injectable} from "@angular/core";
import {
  CardService,
  CreateFlashCardOptions,
  CreateTagOptions,
  UpdateFlashCardOptions
} from "@app/core/services/card.service";
import {Position} from "@app/core/enums/position";
import {Tag} from "@app/models/tag";
import {Column} from "@app/models/column";

@Injectable({
  providedIn: 'root'
})
export class Store {
  // Private BehaviorSubjects to hold the state of cards, columns, tags, and the active tag
  #cards = new BehaviorSubject<Flashcard[]>([]);
  #columns = new BehaviorSubject<Column[]>([]);
  #tags = new BehaviorSubject<Tag[]>([]);
  #activeTag = new BehaviorSubject<Tag | undefined>(undefined);

  // Public observables to expose the state
  cards = this.#cards.asObservable();
  columns = this.#columns.asObservable();
  tags = this.#tags.asObservable();
  activeTag = this.#activeTag.asObservable();

  constructor(private service: CardService) {
    this.loadData();
  }

  /**
   * Creates a new flashcard and fetches the updated list of cards.
   * @param options - Options for creating a flashcard.
   * @returns An observable of the created flashcard.
   */
  private createCard = (options: CreateFlashCardOptions) => this.service.createCard(options)
    .pipe(tap(() => this.fetchCards()));

  /**
   * Sets the active tag.
   * @param tag - The tag to set as active.
   */
  private setActiveTag = (tag: Tag) => {
    this.#activeTag.next(tag);
  }

  /**
   * Creates a new tag and fetches the updated list of tags.
   * @param options - Options for creating a tag.
   * @returns An observable of the created tag.
   */
  private createTag = (options: CreateTagOptions) => {
    return this.service.createTag(options)
      .pipe(tap(() => this.fetchTags()));
  }

  /**
   * Updates an existing flashcard and fetches the updated list of cards.
   * @param options - Options for updating a flashcard.
   * @returns An observable of the updated flashcard.
   */
  private updateCard = (options: UpdateFlashCardOptions) => {
    return this.service.updateCard(options)
      .pipe(tap(() => this.fetchCards()));
  }

  /**
   * Deletes a flashcard and fetches the updated list of cards.
   * @param card - The flashcard to delete.
   * @returns An observable of the deletion result.
   */
  private deleteCard = (card: Flashcard) => {
    return this.service.deleteCard(card.id)
      .pipe(tap(() => this.fetchCards()));
  }

  /**
   * Filters the cards by a specific tag.
   * @param tag - The tag to filter cards by.
   */
  private filterBy = (tag: Tag) => {
    this.service.getCards().pipe(
      map(cards => cards.filter(card => card.tag.id === tag.id))
    ).subscribe(cards => {
        this.setActiveTag(tag);
        this.#cards.next(cards);
      }
    );
  }

  /**
   * Moves a card to a new position within the columns.
   * @param card - The flashcard to move.
   * @param position - The position to move the card to (left or right).
   */
  private moveCard = (card: Flashcard, position: Position) => {
    console.log("Moving card", card, "to", position);
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
        });

        // Update the cards
        this.#cards.next(cards);
        console.log(card);
        const options: UpdateFlashCardOptions = {
          id: card.id,
          question: card.question,
          answer: card.answer,
          columnId: card.column.id,
          tagId: card.tag.id
        };
        this.service.updateCard(options).subscribe();
      })
    ).subscribe();
  }

  /**
   * Fetches the list of tags from the backend.
   */
  private fetchTags = () => {
    this.service.getTags().subscribe(tags => this.#tags.next(tags));
  }

  /**
   * Fetches the list of columns from the backend.
   * @returns An observable of the columns.
   */
  private fetchColumns = () => {
    return this.service.getColumns().subscribe(columns => this.#columns.next(columns));
  }

  /**
   * Fetches the list of cards from the backend, optionally filtered by the active tag.
   */
  private fetchCards = () => {
    const currentTag = this.#activeTag.value;
    if (currentTag) {
      this.service.getCards().pipe(
        map(cards => cards.filter(card => card.tag.id === currentTag.id))
      ).subscribe(cards => this.#cards.next(cards));
    } else {
      this.service.getCards().subscribe(cards => this.#cards.next(cards));
    }
  }

  /**
   * Loads the initial data by fetching tags, columns, and cards.
   */
  private loadData = () => {
    this.fetchTags();
    this.fetchColumns();
    this.fetchCards();
  }

  // Public actions to expose the private methods
  actions = {
    moveCard: this.moveCard,
    createCard: this.createCard,
    createTag: this.createTag,
    updateCard: this.updateCard,
    deleteCard: this.deleteCard,
    filterBy: this.filterBy,
  }
}