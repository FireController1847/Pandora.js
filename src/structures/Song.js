class Song {
  /**
   * @param {Client} client The client that initiated this song.
   * @param {Station} station The station that initiated this song.
   * @param {Object} raw The raw data from the API.
   */
  constructor(client, station, raw) {
    /**
     * The client that initiated this song.
     * @type {Client}
     */
    this.client = client;

    /**
     * The station that initiated this song.
     * @type {Station}
     */
    this.station = station;

    /**
     * The user seed for this song.
     * @type {String}
     */
    this.userSeed = raw.userSeed;

    /**
     * The genre(s) for this song.
     * @type {Array<String>}
     */
    this.genres = raw.genre;

    /**
     * Monthly listening. (?)
     * @type {number}
     */
    this.monthlyListening = raw.monthlyListening;

    /**
     * Listening timestamp. (?)
     * @type {string}
     */
    this.listeningTimestamp = raw.listeningTimestamp;

    /**
     * The URL used for sharing this song.
     * @type {string}
     */
    this.shareURL = raw.shareLandingURL;

    /**
     * Is seed. (?)
     * @type {boolean}
     */
    this.seed = raw.isSeed;

    /**
     * Whether or not this song allows
     * starting the station from the track.
     * @type {boolean}
     */
    this.canStartFromTrack = raw.allowStartStationFromTrack;

    /**
     * Whether or not this song allows
     * sharing.
     * @type {boolean}
     */
    this.sharingAllowed = raw.allowShareTrack;

    /**
     * Whether or not this song allows
     * buying its track.
     * @type {boolean}
     */
    this.buyingAllowed = raw.allowBuyTrack;

    /**
     * Whether or not this song allows
     * the user to say they're "tired of it".
     * @type {boolean}
     */
    this.tiredAllowed = raw.allowTiredOfTrack;

    /**
     * Whether or not this song allows
     * skipping without limits.
     * @type {boolean}
     */
    this.skipWithoutLimit = raw.allowSkipTrackWithoutLimit;

    /**
     * Whether or not this song allows
     * skipping at all.
     * @type {boolean}
     */
    this.skippingAllowed = raw.allowSkip;

    /**
     * Whether or not this song allows
     * feedback.
     * @type {boolean}
     */
    this.feedbackAllowed = raw.allowFeedback;

    /**
     * The composer name for this song.
     * @type {string}
     */
    this.composerName = raw.composerName;

    /**
     * The SEO token for the artist of
     * this song.
     * @type {String}
     */
    this.artistSeoToken = raw.artistSeoToken;

    /**
     * The SEO token for the album of
     * this song.
     * @type {String}
     */
    this.albumSeoToken = raw.albumSeoToken;

    /**
     * Whether or not this song is a compilation
     * of other songs.
     * @type {boolean}
     */
    this.compilation = raw.isCompilation;

    /**
     * The Amazon URL for this song.
     * @type {string}
     */
    this.amazonURL = raw.amazonUrl;

    /**
     * The ITunes URL for this song.
     * @type {string}
     */
    this.itunesURL = raw.itunesUrl;

    /**
     * Whether or not this is a featured song.
     * @type {boolean}
     */
    this.featured = raw.isFeatured;

    /**
     * Whether or not this is a bookmarked song.
     * @type {boolean}
     */
    this.bookmarked = raw.isBookmarked;

    /**
     * The URLs for the ads attributed to this song.
     * @type {Object}
     */
    this.adUrls = {

      /**
       * The ad used if the user wants to gain more skips.
       * @type {String}
       */
      flexSkip: raw.adUrls.flexSkipAdUrl,

      /**
       * The ad used if the user wants to gain more replays.
       * @type {String}
       */
      flexReplay: raw.adUrls.flexSkipAdUrl,

      /**
       * The ad used if the user wants to skip using a thumbs down.
       * @type {String}
       */
      flexThumbsDown: raw.adUrls.flexThumbsDownAdUrl,

      /**
       * The ad used for now playing songs.
       * @type {String}
       */
      nowPlayingStation: raw.adUrls.nowPlayingStationAdUrl,

      /**
       * The nowplaying ad unit. (?)
       * @type {String}
       */
      nowPlayingStationAdUnit: raw.adUrls.nowPlayingStationAdUnit,

      /**
       * The nowplaying ad 'targeting'. (?)
       * @type {String}
       */
      nowPlayingStationAdTargeting: raw.adUrls.nowPlayingStationAdTargeting,

      /**
       * The "backstage" ad. (?)
       * @type {String}
       */
      backstage: raw.adUrls.backstageAdUrl,

      /**
       * The "backstage" ad unit. (?)
       * @type {String}
       */
      backstageAdUnit: raw.adUrls.backstageAdUnit,

      /**
       * The "backstage" ad targeting. (?)
       * @type {String}
       */
      backstageAdTargeting: raw.adUrls.backstageAdTargeting
    };

    /**
     * The title for this song.
     * @type {String}
     */
    this.title = raw.songTitle;

    /**
     * The music ID for this song.
     * @type {String}
     */
    this.id = raw.musicId;

    /**
     * The track type for this song. (?)
     * @type {String}
     */
    this.trackType = raw.trackType;

    /**
     * The internal pandora ID for this song.
     * @type {String}
     */
    this.pandoraId = raw.pandoraId;

    /**
     * This song's token.
     * @type {String}
     */
    this.token = raw.trackToken;

    /**
     * This song's identity.
     * @type {String}
     */
    this.identity = raw.identity;

    /**
     * The length of this song in seconds.
     * @type {number}
     */
    this.length = raw.trackLength;

    /**
     * The rating of this song (possibly internal?). (?)
     * @type {number}
     */
    this.rating = raw.rating;

    /**
     * How much gain is modified in the provided audio URL.
     * @type {String}
     */
    this.gain = raw.fileGain;

    /**
     * The URL for getting details about the song.
     * @type {String}
     */
    this.detailURL = raw.songDetailURL;

    /**
     * The track's SEO token.
     * @type {String}
     */
    this.trackSeoToken = raw.trackSeoToken;

    /**
     * The audio URL for this song.
     * @type {String}
     */
    this.audioURL = raw.audioURL;

    /**
     * The rights that this song. These should NEVER BE IGNORED.
     * @type {Array<String>}
     */
    this.rights = raw.rights;

    /**
     * The audio encoding for the provided audio URL.
     * @type {String}
     */
    this.audioEncoding = raw.audioEncoding;

    /**
     * The token id for the provided audio URL.
     * @type {String}
     */
    this.audioToken = raw.audioTokenId;

    /**
     * The recipt URL for the provided audio URL. (?)
     * @type {String}
     */
    this.audioReciptURL = raw.audioReciptURL;

    /**
     * The skip URL for the provided audio URL. (?)
     * @type {String}
     */
    this.audioSkipURL = raw.audioSkipURL;

    /**
     * The artist of this song.
     * @type {Object}
     */
    this.artist = {

      /**
       * The name of the artist of this song.
       * @type {String}
       */
      name: raw.artistName,

      /**
       * The ID of the artist's music. (?)
       * @type {String}
       */
      musicId: raw.artistMusicId,

      /**
       * @typedef ArtistArt
       * @property {String} url The URL for this art.
       * @property {number} size The size in pixels of this art.
       */
      /**
       * The art for the artist.
       * @type {Array<ArtistArt>}
       */
      art: raw.artistArt,

      /**
       * The URL used for getting details about the artist.
       * @type {String}
       */
      detailURL: raw.artistDetailURL
    };

    /**
     * The album for this song.
     * @type {Object}
     */
    this.album = {

      /**
       * The title of this song's album.
       * @type {String}
       */
      title: raw.albumTitle,

      /**
       * @typedef AlbumArt
       * @property {String} url The URL for this art.
       * @property {number} size The size in pixels of this art.
       */
      /**
       * The art for this song's album.
       */
      art: raw.albumArt,

      /**
       * The detail URL for getting information about this song's album.
       * @type {String}
       */
      detailURL: raw.albumDetailURL
    };

    /**
     * The song's track key.
     * @type {Object}
     */
    this.trackKey = {

      /**
       * The track ID. (?)
       * @type {String}
       */
      trackId: raw.trackId,

      /**
       * The track type. (?)
       * @type {String}
       */
      trackType: raw.trackType,

      /**
       * The spin id. (?)
       * @type {String}
       */
      spinId: raw.spinId
    };
  }
}

module.exports = Song;