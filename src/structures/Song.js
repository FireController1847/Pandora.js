/**
 * Represents a Pandora Song.
 *
 * @typedef {import('../client/Client.js')} Client
 * @typedef {import('../client/Client.js').Art} Art
 * @typedef {import('./Station.js')} Station
 */
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
     * @type {string}
     */
    this.userSeed = raw.userSeed;

    /**
     * The genre(s) for this song.
     * @type {Array<string>}
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
     * @type {string}
     */
    this.artistSeoToken = raw.artistSeoToken;

    /**
     * The SEO token for the album of
     * this song.
     * @type {string}
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
     * @typedef AdUrls
     * @property {string} flexSkip The ad used if the user wants to gain more skips.
     * @property {string} flexReplay The ad used if the user wants to gain more replays.
     * @property {string} flexThumbsDown The ad used if the user wants to skip using a thumbs down.
     * @property {string} nowPlayingStation The ad used for now playing songs.
     * @property {string} nowPlayingStationAdUnit The nowplaying ad unit. (?)
     * @property {string} nowPlayingStationAdTargeting The nowplaying ad 'targeting'. (?)
     * @property {string} backstage The "backstage" ad. (?)
     * @property {string} backstageAdUnit The "backstage" ad unit. (?)
     * @property {string} backstageAdTargeting The "backstage" ad targeting. (?)
     */
    this.adUrls = {
      flexSkip: raw.adUrls ? raw.adUrls.flexSkipAdUrl : "",
      flexReplay: raw.adUrls ? raw.adUrls.flexSkipAdUrl : "",
      flexThumbsDown: raw.adUrls ? raw.adUrls.flexThumbsDownAdUrl : "",
      nowPlayingStation: raw.adUrls ? raw.adUrls.nowPlayingStationAdUrl : "",
      nowPlayingStationAdUnit: raw.adUrls ? raw.adUrls.nowPlayingStationAdUnit : "",
      nowPlayingStationAdTargeting: raw.adUrls ? raw.adUrls.nowPlayingStationAdTargeting : "",
      backstage: raw.adUrls ? raw.adUrls.backstageAdUrl : "",
      backstageAdUnit: raw.adUrls ? raw.adUrls.backstageAdUnit : "",
      backstageAdTargeting: raw.adUrls ? raw.adUrls.backstageAdTargeting : ""
    };

    /**
     * The title for this song.
     * @type {string}
     */
    this.title = raw.songTitle;

    /**
     * The music ID for this song.
     * @type {string}
     */
    this.id = raw.musicId;

    /**
     * The track type for this song. (?)
     * @type {string}
     */
    this.trackType = raw.trackType;

    /**
     * The internal pandora ID for this song.
     * @type {string}
     */
    this.pandoraId = raw.pandoraId;

    /**
     * This song's token.
     * @type {string}
     */
    this.token = raw.trackToken;

    /**
     * This song's identity.
     * @type {string}
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
     * @type {string}
     */
    this.gain = raw.fileGain;

    /**
     * The URL for getting details about the song.
     * @type {string}
     */
    this.detailURL = raw.songDetailURL;

    /**
     * The track's SEO token.
     * @type {string}
     */
    this.trackSeoToken = raw.trackSeoToken;

    /**
     * The audio URL for this song.
     * @type {string}
     */
    this.audioURL = raw.audioURL;

    /**
     * The rights that this song. These should NEVER BE IGNORED.
     * @type {Array<string>}
     */
    this.rights = raw.rights;

    /**
     * The audio encoding for the provided audio URL.
     * @type {string}
     */
    this.audioEncoding = raw.audioEncoding;

    /**
     * The token id for the provided audio URL.
     * @type {string}
     */
    this.audioToken = raw.audioTokenId;

    /**
     * The recipt URL for the provided audio URL. (?)
     * @type {string}
     */
    this.audioReciptURL = raw.audioReciptURL;

    /**
     * The skip URL for the provided audio URL. (?)
     * @type {string}
     */
    this.audioSkipURL = raw.audioSkipURL;

    /**
     * The artist of this song.
     * @typedef Artist
     * @property {string} name The name of the artist of this song.
     * @property {string} musicId The ID of the artist's music. (?)
     * @property {Array<Art>} art The art for the artist.
     * @property {string} detailURL The URL used for getting details about the artist.
     */
    this.artist = {
      name: raw.artistName,
      musicId: raw.artistMusicId,
      art: raw.artistArt,
      detailURL: raw.artistDetailURL
    };

    /**
     * The album for this song.
     * @typedef SongAlbum
     * @property {string} title The title of this song's album.
     * @property {Array<Art>} art The art for this album.
     * @property {string} detailURL The detail URL for getting information about this song's album.
     */
    this.album = {
      title: raw.albumTitle,
      art: raw.albumArt,
      detailURL: raw.albumDetailURL
    };

    /**
     * The song's track key.
     * @typedef SongTrackKey
     * @property {string} trackId The track ID. (?)
     * @property {string} trackType The track type. (?)
     * @property {string} spinId The spin id. (?)
     */
    this.trackKey = {
      trackId: raw.trackId,
      trackType: raw.trackType,
      spinId: raw.spinId
    };
  }
}

module.exports = Song;