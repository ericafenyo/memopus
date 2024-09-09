import {Tag} from "@app/interfaces/tag";
import {Column} from "@app/interfaces/column";

/**
 * Represents a card with a question and a hidden answer used for study.
 */
export interface Flashcard {
  /**
   * Unique identifier for the card.
   */
  id: string;

  /**
   * The question on the card.
   */
  question: string;

  /**
   * The answer corresponding to the question on the card.
   */
  answer: string;

  /**
   * Additional explanation for the answer.
   */
  description?: string;

  /**
   * The tag associated with the card.
   */
  tag: Tag;

  /**
   * The column associated with the card.
   */
  column: Column;
}
