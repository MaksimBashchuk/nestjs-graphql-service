import { UseGuards } from '@nestjs/common';
import {
  Args,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Mutation,
} from '@nestjs/graphql';

import { Favourites } from './favourite.entity';
import { Artist } from '../artists/artist.entity';
import { Band } from '../bands/band.entity';
import { Track } from '../tracks/track.entity';
import { Genre } from '../genres/genre.entity';

import { FavouritesService } from './favourites.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { TracksService } from '../tracks/tracks.service';
import { GenresService } from '../genres/genres.service';

import { AuthGuard } from '../users/auth.guard';

import { FAVOURITES } from './constants';

@Resolver(() => Favourites)
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
  ) {}

  @ResolveField(() => [Artist], { nullable: 'itemsAndList' })
  async artists(@Parent() favourites: Favourites): Promise<Artist[]> {
    const { artistsIds } = favourites;

    return await Promise.all(
      artistsIds.map(id => this.artistsService.getArtist(id)),
    );
  }

  @ResolveField(() => [Band], { nullable: 'itemsAndList' })
  async bands(@Parent() favourites: Favourites): Promise<Band[]> {
    const { bandsIds } = favourites;

    return await Promise.all(bandsIds.map(id => this.bandsService.getBand(id)));
  }

  @ResolveField(() => [Track], { nullable: 'itemsAndList' })
  async tracks(@Parent() favourites: Favourites): Promise<Track[]> {
    const { tracksIds } = favourites;

    return await Promise.all(
      tracksIds.map(id => this.tracksService.getTrack(id)),
    );
  }

  @ResolveField(() => [Genre], { nullable: 'itemsAndList' })
  async genres(@Parent() favourites: Favourites): Promise<Genre[]> {
    const { genresIds } = favourites;

    return await Promise.all(
      genresIds.map(id => this.genresService.getGenre(id)),
    );
  }

  @Query(() => Favourites, { nullable: true })
  @UseGuards(AuthGuard)
  async favourites(): Promise<Favourites> {
    return await this.favouritesService.getAllFavourites();
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  addTrackToFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.addFavouritesByType(FAVOURITES.TRACKS, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  addBandToFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.addFavouritesByType(FAVOURITES.BANDS, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  addArtistToFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.addFavouritesByType(FAVOURITES.ARTISTS, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  addGenreToFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.addFavouritesByType(FAVOURITES.GENRES, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  removeTrackFromFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.removeFavouritesByType(FAVOURITES.TRACKS, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  removeBandFromFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.removeFavouritesByType(FAVOURITES.BANDS, id);
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  removeArtistFromFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.removeFavouritesByType(
      FAVOURITES.ARTISTS,
      id,
    );
  }

  @Mutation(() => Favourites)
  @UseGuards(AuthGuard)
  removeGenreFromFavourites(@Args('id') id: string): Promise<Favourites> {
    return this.favouritesService.removeFavouritesByType(FAVOURITES.GENRES, id);
  }
}
