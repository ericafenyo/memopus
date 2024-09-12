import {Injectable} from '@angular/core';
import {z} from 'zod';
import {Session} from "@app/models/session";
import {UserService} from "@app/core/services/user.service";
import {map, take} from "rxjs";
import {isEmpty} from "lodash";

// Define a schema for session validation using zod
const schema = z.object({
  id: z.string().uuid(),
  subject: z.string().uuid(),
  created: z.string().datetime().transform((value) => new Date(value)),
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #sessionKey = "auth";

  constructor(private userService: UserService) {}

  /**
   * Check if the user is authenticated.
   * @returns A promise that resolves to true if the user is authenticated, otherwise false.
   */
  isAuthenticated() {
    return new Promise<boolean>((resolve) => {
      const session = this.getSession();
      if (isEmpty(session)) {
        resolve(false);
        return;
      }
      this.userService.getUser(session.subject)
        .pipe(
          take(1),
          map(user => {
              resolve(!isEmpty(user))
            }
          )
        ).subscribe();
    });
  }

  /**
   * Get the current user authentication session.
   *
   * @returns The current session or null if there is no session.
   */
  getSession(): Session | null {
    // Get the session from the session storage
    const item = window.sessionStorage.getItem(this.#sessionKey);

    // Return fast when the item is null.
    if (!item) {
      return null;
    }

    // Validate the session data and return it if it is valid. Otherwise, return null.
    const result = schema.safeParse(JSON.parse(item));
    if (!result.success) {
      console.error(result.error?.format());
      return null;
    }
    return result.data;
  }

  /**
   * Set the current user authentication session.
   *
   * @param session The session to set.
   */
  setSession(session: Session) {
    window.sessionStorage.setItem(this.#sessionKey, JSON.stringify(session));
  }
}
