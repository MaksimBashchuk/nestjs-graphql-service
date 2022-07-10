import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { DeletedItem } from '../common/deletedItem.entity';
import { Track } from '../tracks/track.entity';
import { Artist } from '../artists/artist.entity';
import { Band } from '../bands/band.entity';
import { Genre } from '../genres/genre.entity';
// import { Album } from '../albums/album.entity';

import { TracksService } from './tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
// import { AlbumsService } from '../albums/albums.service';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService, // private albumsService: AlbumsService
  ) {}

  // @ResolveField()
  // async album

  @ResolveField(() => [Artist], { nullable: 'itemsAndList' })
  async artists(@Parent() track: Track): Promise<Artist[]> {
    const { artistsIds } = track;

    return await Promise.all(
      artistsIds.map(id => this.artistsService.getArtist(id)),
    );
  }

  @ResolveField(() => [Band], { nullable: 'itemsAndList' })
  async bands(@Parent() track: Track): Promise<Band[]> {
    const { bandsIds } = track;

    return await Promise.all(bandsIds.map(id => this.bandsService.getBand(id)));
  }

  @ResolveField(() => [Genre], { nullable: 'itemsAndList' })
  async genres(@Parent() track: Track): Promise<Genre[]> {
    const { genresIds } = track;

    return await Promise.all(
      genresIds.map(id => this.genresService.getGenre(id)),
    );
  }

  @Query(() => [Track])
  tracks(): Promise<Track[]> {
    return this.tracksService.getAllTracks();
  }
}
