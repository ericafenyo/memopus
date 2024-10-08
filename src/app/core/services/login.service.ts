import {Injectable} from '@angular/core';
import {User} from "@app/models/user";
import {Session} from "@app/models/session";
import {filter, map, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';
import {environment} from "@src/environments/environment"
import {AuthService} from "@app/core/services/auth.service";

/**
 * Type representing the options for login..
 */
export type LoginOptions = Omit<User, "id">

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Logs in a user by verifying their credentials and creating a session.
   * @param loginOptions - An object containing the username and password.
   * @returns An Observable that emits the created session.
   */
  login({username, password}: LoginOptions) {
    return this.http.get<User[]>(`${environment.apiUrl}/users`) // Assuming users is an array
      .pipe(
        filter((users: User[]) => {
          const user = users.find(u => u.username === username && u.password === password);
          return !!user;
        }),
        map((users: User[]) => {
          const user = users.find(u => u.username === username && u.password === password);
          const session: Session = {
            id: uuidv4(),
            subject: user!.id,
            created: new Date(),
          };
          return session;
        }),
        switchMap((session: Session) => {
          this.authService.setSession(session);
          return this.http.post<Session>(`${environment.apiUrl}/sessions`, session);
        })
      );
  }
}
