/**
 * Represents a column used for organizing flashcard.
 */
export interface Column {
  /**
   * Unique identifier for the column.
   */
  id: string;

  /**
   * The label or name associated with the column.
   */
  label: string;

  /**
   * The position of the column in the list of columns.
   */
  order: number;
}
