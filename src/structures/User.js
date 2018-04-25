const Collection = require('./Collection.js');
const Station = require('./Station.js');

class User {
  /**
   * @param {Client} client The client that initiated this user.
   * @param {Object} raw The raw data from the API.
   */
  constructor(client, raw) {
    /**
     * The client that initiated this user.
     * @type {Client}
     */
    this.client = client;

    /**
     * The token used for future requests.
     * @type {string}
     */
    this.token = raw.authToken;

    /**
     * The user's ID.
     * @type {string}
     */
    this.id = raw.listenerId;

    /**
     * The email for this user.
     * @type {string}
     */
    this.email = raw.username;

    /**
     * The username for this user.
     * @type {string}
     */
    this.username = raw.webname;

    /**
     * Whether or not this user allows explicit content.
     * @type {boolean}
     */
    this.explicit = !raw.explicitContentFilterEnabled;

    /**
     * The user account's birth year.
     * @type {number}
     */
    this.birthYear = raw.birthYear;

    /**
     * The user account's zip code. (Presumably estimated.)
     * @type {string}
     */
    this.zip = raw.zipCode;

    /**
     * The user's gender.
     * @type {string}
     */
    this.gender = raw.gender;

    /**
     * Presumably whether or not the user is under 13.
     * @type {boolean}
     */
    this.minor = raw.minor;

    /**
     * Whether or not this user's profile is private.
     * @type {boolean}
     */
    this.private = raw.profilePrivate;

    /**
     * Tells if the user has opted out of Pandora's emails.
     * @type {boolean}
     */
    this.emailOptOut = raw.emailOptOut;

    /**
     * Whether or not this profile allows comments.
     * @type {boolean}
     */
    this.allowComments = raw.allowProfileComments;

    /**
     * Whether or not the user recieves notifications on new comments.
     * @type {boolean}
     */
    this.notifyOnComment = raw.notifyOnComment;

    /**
     * Whether or not the user recieves notifications on a new follower.
     * @type {boolean}
     */
    this.notifyOnFollower = raw.notifyOnFollower;

    /**
     * Whether or not the user has promo emails enabled for artists.
     * @type {boolean}
     */
    this.recieveArtistEmails = raw.artistPromoEmailsEnabled;

    /**
     * Whether or not the user will recieve audio promos for artists.
     * @type {boolean}
     */
    this.recieveAudioPromos = raw.artistAudioMessagesEnabled;

    /**
     * Whether or not this is a new account.
     * @type {boolean}
     */
    this.isNew = raw.isNew;

    /**
     * This user's custom configuration.
     * @type {Object}
     */
    this.config = {

      /**
       * What type of branding to use for Pandora.
       * @type {string}
       */
      branding: raw.config.branding,

      /**
       * How many skips the user gets per day.
       * @type {number}
       */
      dailySkipLimit: raw.config.dailySkipLimit,

      /**
       * How many skips the user gets per station.
       * @type {number}
       */
      stationSkipLimit: raw.config.stationSkipLimit,

      /**
       * How long it takes for the user to timeout when
       * no activity is detected.
       * @type {number}
       */
      inactivityTimeout: raw.config.inactivityTimeout,

      /**
       * I'm not exactly sure what this is for.
       * @type {Array<number>}
       */
      experiments: raw.config.experiments,

      /**
       * Other options that may or may not be attributed
       * to if the user is a Pandora Premium or Pandora Plus
       * subscriber.
       * @type {Array<String>}
       */
      flags: raw.config.flags,

      /**
       * Not exactly sure. I guess the amount of hours
       * until you can't listen anymore per month?
       * @type {number}
       */
      monthlyListeningCapHours: raw.config.monthlyListeningCapHours
    };

    /**
     * Okay, now the variable names are just
     * getting weird. I have no idea what
     * this one does or means.
     * @type {Object}
     */
    this.adkv = raw.adkv;

    /**
     * Active VX Rewards?
     * @type {Array}
     */
    this.activeVxRewards = raw.activeVxRewards;

    /**
     * The pandora listener token.
     * @type {string}
     */
    this.listenerToken = raw.listenerToken;

    /**
     * Whether or not this user uses high quality
     * audio files or not.
     * @type {boolean}
     */
    this.highQuality = raw.highQualityStreamingEnabled;

    /**
     * Assumingly, this indicates whether the user has
     * seen the intro tutorial that Pandora provides.
     * @type {boolean}
     */
    this.seenTutorial = raw.seenEducation;

    /**
     * Smart conversion ad URL.
     * @type {String}
     */
    this.smartConversionAdUrl = raw.smartConversionAdUrl;

    /**
     * I have no idea what smart conversion is, but
     * here's a timeout for it.
     * @type {number}
     */
    this.smartConversionTimeoutMillis = raw.smartConversionTimeoutMillis;

    /**
     * Whether or not smart conversion is disabled.
     * @type {boolean}
     */
    this.smartConversionDisabled = raw.smartConversionDisabled;

    /**
     * How many stations this user has.
     * @type {number}
     */
    this.stationCount = raw.stationCount;

    /**
     * What web client the user last used, I assume.
     * @type {string}
     */
    this.webClientVersion = raw.webClientVersion;

    /**
     * The placeholder image for this account, if the user does not have an avatar.
     * @type {string}
     */
    this.placeholderImageURL = raw.placeholderProfileImageUrl;

    /**
     * Whether or not autoplay is enabled for playlists.
     * @type {boolean}
     */
    this.autoplay = raw.autoplayEnabled;

    /**
     * A kruxToken. For all your kruxing needs.
     * @type {string}
     */
    this.kruxToken = raw.kruxToken;

    /**
     * A list of this user's stations.
     * @type {Map<String, Station>}
     */
    this.stations = new Collection();
  }

  /**
   * Reset and get the list of stations
   * from the user.
   * @returns {Promise<Map<String, Station>>}
   */
  async getStations() {
    this.stations.clear();
    const list = await this.client.rest.getStations();
    for (let i = 0; i < list.stations.length; i++) {
      const station = new Station(this.client, list.stations[i]);
      this.stations.set(station.id, station);
    }
    return this.stations;
  }
}

module.exports = User;