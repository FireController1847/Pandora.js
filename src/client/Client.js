const { EventEmitter } = require("events");
const RESTManager = require("./RESTManager.js");
const User = require("../structures/User.js");
// const SearchAnnotation = require("../structures/SearchAnnotation.js");

/**
 * @typedef {import('./RESTManager.js')} RESTManager
 * @typedef {import('../structures/User.js')} User
 * @typedef {import('../structures/SearchAnnotation')} SearchAnnotation
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

  // /**
  //  * Searches the entire Pandora API.
  //  * @param {string} query The string you want to search for.
  //  * @param {SearchType} [type="ALL"] The type of things you want to search for.
  //  * @param {number} [count=20] The amount of results you'd like to recieve.
  //  * @returns {Promise<Array<SearchAnnotation>>}
  //  */
  // async search(query, type = "ALL", count = 20) {
  //   if (!query) throw new Error("No Search Query");
  //   const typearr = Client.SearchTypes[type];
  //   if (!typearr) throw new TypeError("Invalid Search Type");
  //   if (count <= 0) throw new RangeError("Count Must Be Greater Than Zero");

  //   const list = await this.rest.sodSearch(query, count, typearr);
  //   const sa = [];
  //   for (let i = 0; i < list.results.length; i++) {
  //     sa.push(list.annotations[list.results[i]]);
  //   }
  //   return sa;
  // }

  // {query: "rocket league", types: ["AL", "AR", "CO", "TR", "SF", "PL", "ST"], listener: null, start: 0,…}
  // annotate: true
  // count: 20
  // filters: []
  // listener: null
  // query: "rocket league"
  // searchTime: 30069.5999999989
  // start: 0
  // types: ["AL", "AR", "CO", "TR", "SF", "PL", "ST"]

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

/**
 * The different search types:
 *
 * * ALL
 * * ARTISTS
 * * ALBUMS
 * * TRACKS
 * * STATIONS
 * * PLAYLISTS
 *
 * @typedef {string} SearchType
 */
Client.SearchTypes = {
  ALL: ["AL", "AR", "CO", "TR", "SF", "PL", "ST"],
  // What is CO??
  ARTISTS: ["AR", "CO"],
  ALBUMS: ["AL"],
  TRACKS: ["TR"],
  // Can anyone explain the reasoning behind the included colons here?
  STATIONS: ["SF:AR", "SF:CO", "SF:TR", "SF:GE", "SF:HS", "SF:TT", "ST"],
  PLAYLISTS: ["PL"]
};

module.exports = Client;