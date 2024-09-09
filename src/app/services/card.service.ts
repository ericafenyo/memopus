import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment";
import {Flashcard} from "@app/interfaces/flashcard";
import {Column} from "@app/interfaces/column";

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

  getColumn() {
    return this.http.get<Column[]>(`${environment.apiUrl}/columns?_sort=order`);
  }
}
