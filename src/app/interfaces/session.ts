/**
 * Represents the data stored in a session.
 */
export interface Session {
  /**
   * The unique identifier of the session
   */
  id: string;

  /**
   * The unique identifier of the authenticated user.
   */
  userId: number;

  /**
   * The username of the authenticated user.
   */
  username: string;

  /**
   * The session token used for authentication.
   */
  token: string;
}
