import axios from 'axios';
import { BASE_URL } from './constants';

/**
 * This sends a request to the back end's base URL. To conserve resources,
 * the back end sleeps when there's no traffic. This is intended to be called
 * in pages that don't use the back end, so that when the user navigates to a
 * page that does use it, they don't have to sit around waiting.
 */
export function pingApiServer() {
  axios.get(BASE_URL).catch(
    // It doesn't actually matter if there is an error--the point is just to hit the server
    error => {}
  )
}
