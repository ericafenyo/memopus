import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment";
import {Flashcard} from "@app/models/flashcard";
import {Column} from "@app/models/column";
import {z} from "zod"
import {Tag} from "@app/models/tag";

/**
 * Schema for validating Flashcard data.
 */
const CardSchema = z.object({
  id: z.string().trim().uuid(),
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  description: z.string().trim().optional(),
  columnId: z.string().trim().uuid(),
  tagId: z.string().trim().uuid()
});

/**
 * Schema for validating Tag data.
 */
const TagSchema = z.object({
  id: z.string().trim().uuid(),
  label: z.string().trim().min(1),
});

/**
 * Data transfer object used to update a flashcard.
 */
export type UpdateFlashCardOptions = z.infer<typeof CardSchema>

/**
 * Data transfer object used to create a flashcard.
 */
export type CreateFlashCardOptions = z.infer<typeof CardSchema>

/**
 * Data transfer object used to create a tag.
 */
export type CreateTagOptions = z.infer<typeof TagSchema>

/**
 * Service for managing flashcards with columns, and tags sub-resources.
 */
@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }

  /**
   * Fetches all flashcards with their associated tags and columns.
   * @returns An Observable of an array of Flashcards.
   */
  getCards() {
    return this.http.get<Flashcard[]>(`${environment.apiUrl}/cards?_embed=tag&_embed=column`);
  }

  /**
   * Fetches all columns sorted by order.
   * @returns An Observable of an array of Columns.
   */
  getColumns() {
    return this.http.get<Column[]>(`${environment.apiUrl}/columns?_sort=order`);
  }

  /**
   * Updates a flashcard with the given options.
   * @param options - The options containing properties to be updated.
   * @returns An Observable of the updated Flashcard.
   */
  updateCard(options: UpdateFlashCardOptions) {
    return this.http.put<Flashcard>(`${environment.apiUrl}/cards/${options.id}`, options);
  }

  /**
   * Fetches all tags.
   * @returns An Observable of an array of Tags.
   */
  getTags() {
    return this.http.get<Tag[]>(`${environment.apiUrl}/tags`);
  }

  /**
   * Creates a new flashcard with the given options.
   * @param options - The options for creating the flashcard.
   * @returns An Observable of the created Flashcard.
   */
  createCard(options: CreateFlashCardOptions) {
    const data = CardSchema.parse(options);
    return this.http.post<Flashcard>(`${environment.apiUrl}/cards`, data);
  }

  /**
   * Creates a new tag with the given options.
   * @param options - The options for creating the tag.
   * @returns An Observable of the created Tag.
   */
  createTag(options: CreateTagOptions) {
    const data = TagSchema.parse(options);
    return this.http.post<Tag>(`${environment.apiUrl}/tags`, data);
  }

  /**
   * Deletes a flashcard by its ID.
   * @param id - The ID of the flashcard to delete.
   * @returns An Observable of the deletion result.
   */
  deleteCard(id: string) {
    return this.http.delete(`${environment.apiUrl}/cards/${id}`);
  }
}
