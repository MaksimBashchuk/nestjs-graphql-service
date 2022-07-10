export const BASE_FAVOURITES_URL =
  process.env.FAVOURITES_URL || 'http://localhost:3007/v1/favourites';

export const ADD_TO_FAVOURITES = `${BASE_FAVOURITES_URL}/add`;

export const enum FAVOURITES {
  BANDS = 'bands',
  GENRES = 'genres',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
}
