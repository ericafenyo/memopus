import {Injectable} from '@angular/core';
import {User} from "@/interfaces/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "@src/environments/environment"
import {Observable} from "rxjs";

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
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
  }
}
