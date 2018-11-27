const { EventEmitter } = require("events");
const RESTManager = require("./RESTManager.js");
const User = require("../structures/User.js");

/**
 * @typedef {import('./RESTManager.js')} RESTManager
 * @typedef {import('../structures/User.js')} User
 * @ignore
 */

/**
 * TODO: ADD ERRORS ON INVALID PARAMETERS
 * SUGGESTION: When we finally release it as a module (if I even do that), maybe make it so
 *  that when the user is logging in there's a little link that says "Don't trust it? Click here."
 *  Then, when the user clicks, it will link them to a page that shows them the source code that
 *  directly calls the API, and does not store their username and password.
 * @ignore
 */

/**
 * Represents the Pandora "client" and gives a reference
 * to the user for all classes.
 * @extends EventEmitter
 */
class Client extends EventEmitter {
  constructor() {
    super();
    /**
     * The REST manager for this client.
     * @type {RESTManager}
     */
    this.rest = new RESTManager(this);

    /**
     * Represents the connection to the user's Pandora account.
     * Determined after login.
     * @type {User|null}
     */
    this.user = null;
  }

  /**
   * Login to the Pandora API.
   * @param {string} username The Pandora account's username.
   * @param {string} password The Pandora account's password.
   * @returns {Promise}
   */
  async login(username, password) {
    await this.rest.getCSRFToken();
    const user = await this.rest.authLogin(username, password);
    this.user = new User(this, user);
    /**
     * Emitted when the client successfully logs
     * in to the Pandora API.
     * @event Client#ready
     */
    this.emit("ready");
  }

  /** @ignore Utility Methods */

  /**
   * Emitted for debug information, especially on
   * API requests.
   * @event Client#debug
   */
  debug() {
    process.stdout.write(`[DEBUG] `);
    console.log(...arguments);
  }
}

/**
 * @typedef {Object} Art
 * @property {String} url The URL for this art.
 * @property {number} size The size in pixels of this art.
 */

module.exports = Client;