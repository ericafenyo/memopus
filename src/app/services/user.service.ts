import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment"
import {Observable} from "rxjs";
import {Flashcard} from "@app/interfaces/flashcard";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * Get a user by their id.
   *
   * @param id The id of the user to get.
   */
  getUser(id: string): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${environment.apiUrl}/users/${id}`)
  }
}
