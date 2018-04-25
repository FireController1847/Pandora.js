const cookie = require('cookie');
const query = require('querystring');
const snekfetch = require('snekfetch');

class RESTManager {
  /**
   * @param {Client} client The client that runs the REST manager.
   */
  constructor(client) {
    this.client = client;

    /**
     * The cookies for this REST manager.
     * @type {Object}
     */
    this.cookies = {};

    /**
     * The Pandora Website URL
     * @type {String}
     */
    this.url = 'https://www.pandora.com/';

    /**
     * The user object gotten after login.
     * @type {User|null}
     */
    this.user = null;
  }

  /** Util */
  /**
   * Requests the API.
   * @param {string} endpoint The endpoint you want to request for.
   * @param {Object} options The Request options.
   * @param {string} [options.method='post'] The method you want the request to use.
   * @param {Object} options.query An object indicating the different queries.
   * @param {Object} options.headers An objects containing the headers you want to include.
   * @param {Snekfetch.Data} options.content The body of the request
   * @param {boolean} [options.cookies=true] Whether or not to include cookies with the request.
   * @param {boolean} [options.auth=true] Whether ot not to include the authToken if {@link RESTManager#user} is defined.
   * @param {boolean} [options.raw=false] Set to true if you want to get the raw result from snekfetch, instead of attempting to parse it.
   * @returns {Promise<Object>} The request response in JSON unless raw was defined.
   */
  async request(endpoint, options = {}) {
    if (options.query) options.query = query.stringify(options.query);
    options.url = `${this.url}api/${options.version || 'v1'}/${endpoint}${options.query ? `?${options.query}` : ''}`;
    this.client.debug(options.url);
    let req = snekfetch[options.method || 'post'](options.url)
      .set('X-CsrfToken', this.cookies.csrftoken)
      .set('Content-Type', 'application/json');
    if (this.client.user && options.user != false) req = req.set('X-AuthToken', this.client.user.token);
    if (options.cookies != false) req = req.set('Cookie', this.getCookieString());
    if (options.headers) req = req.set(options.headers);
    if (options.content) req = req.send(options.content);
    const res = await req;
    if (res.headers['set-cookie']) this.setCookies(res.headers['set-cookie']);
    if (options.raw) return res;
    else return JSON.parse(res.text);
  }

  /** Cookies */

  /**
   * Get the HTTP-serialized cookie string.
   * @returns {String}
   */
  getCookieString() {
    const arr = [];
    Object.keys(this.cookies).forEach(key => {
      arr.push(cookie.serialize(key, this.cookies[key]));
    });
    return arr.join(';');
  }

  /**
   * Set the cookies from the HTTP-set-cookie header.
   * @param {Array<String>} header An array of strings from the header.
   * @returns {Object}
   */
  setCookies(header) {
    header.map(cookie.parse.bind(this)).forEach(co => {
      Object.keys(co).forEach(key => {
        this.cookies[key] = co[key];
      });
    });
    return this.cookies;
  }

  /** Methods */
  async getCSRFToken() {
    const res = await snekfetch.head(this.url);
    this.setCookies(res.headers['set-cookie'] || []);
    return res;
  }

  /**
   * Calls the auth/login endpoint.
   * @param {String} username The username.
   * @param {String} password The password.
   * @returns {Promise<Object>}
   */
  async authLogin(username, password) {
    const res = await this.request('auth/login', {
      content: { username, password }
    });
    return res;
  }

  /**
   * Gets a list of stations.
   * @param {Object} options
   * @param {number} options.pageSize How big each page is.
   */
  async getStations(options = {}) {
    const res = await this.request('station/getStations', {
      content: options
    });
    return res;
  }

  /**
   * Calls the playlist/getFragment endpoint.
   * @param {String} stationId The station id.
   * @param {boolean} isStationStart Should be set to true if you're starting the station for the first time.
   * @param {Object} options
   * @param {string} options.audioFormat The audio format to use. Current types are unknown.
   * @param {string} options.fragmentRequestReason Should be "Normal", other reasons currently unknown.
   * @returns {Promise<Object>}
   */
  async playlistGetFragment(stationId, isStationStart, options = {}) {
    const res = await this.request('playlist/getFragment', {
      content: Object.assign({ stationId, isStationStart }, options)
    });
    return res;
  }
}

module.exports = RESTManager;