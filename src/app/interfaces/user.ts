/**
 * Represents a user in the system.
 */
export interface User {
  /**
   * The unique identifier for the user.
   */
  id: number;

  /**
   * The username chosen by the user.
   */
  username: string;

  /**
   * The user's password used to authenticate the user during login.
   */
  password: string;
}
