import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment";
import {Flashcard} from "@app/interfaces/flashcard";
import {Column} from "@app/interfaces/column";
import {z} from "zod"
import {Tag} from "@app/interfaces/tag";

const schema = z.object({
  id: z.string().uuid(),
  question: z.string().min(1),
  answer: z.string().min(1),
  columnId: z.string().uuid(),
  tagId: z.string().uuid()
});

export type UpdateFlashCardOptions = z.infer<typeof schema>

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) { }

  /**
   * Get all cards.
   */
  getCards() {
    return this.http.get<Flashcard[]>(`${environment.apiUrl}/cards?_embed=tag&_embed=column`);
  }

  getColumns() {
    return this.http.get<Column[]>(`${environment.apiUrl}/columns?_sort=order`);
  }

  updateCard(options: UpdateFlashCardOptions) {
    return this.http.put<Flashcard>(`${environment.apiUrl}/cards/${options.id}`, options);
  }

  getTags() {
    return this.http.get<Tag[]>(`${environment.apiUrl}/tags`);
  }
}
