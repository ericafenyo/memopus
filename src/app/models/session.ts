/**
 * Represents the data stored in a session.
 */
export interface Session {
  /**
   * The unique identifier of the session
   */
  id: string;

  /**
   * The unique identifier of the user.
   */
  subject: string;

  /**
   * The date the session was created.
   */
  created: Date;
}
