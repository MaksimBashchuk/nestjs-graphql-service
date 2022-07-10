import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { DeletedItem } from '../common/deletedItem.entity';
import { Album } from './album.entity';
import { Artist } from '../artists/artist.entity';
import { Band } from '../bands/band.entity';
import { Track } from '../tracks/track.entity';
import { Genre } from '../genres/genre.entity';

import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { TracksService } from '../tracks/tracks.service';
import { GenresService } from '../genres/genres.service';

// import { GetAlbumArgs } from './dto/getAlbum.args';
// import { CreateAlbumArgs } from './dto/createAlbum.args';
// import { UpdateAlbumArgs } from './dto/updateAlbum.args';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
  ) {}

  @ResolveField(() => [Artist], { nullable: 'itemsAndList' })
  async artists(@Parent() album: Album): Promise<Artist[]> {
    const { artistsIds } = album;

    return await Promise.all(
      artistsIds.map(id => this.artistsService.getArtist(id)),
    );
  }

  @ResolveField(() => [Band], { nullable: 'itemsAndList' })
  async bands(@Parent() album: Album): Promise<Band[]> {
    const { bandsIds } = album;

    return await Promise.all(bandsIds.map(id => this.bandsService.getBand(id)));
  }

  @ResolveField(() => [Track], { nullable: 'itemsAndList' })
  async tracks(@Parent() album: Album): Promise<Track[]> {
    const { trackIds } = album;

    return await Promise.all(
      trackIds.map(id => this.tracksService.getTrack(id)),
    );
  }

  @ResolveField(() => [Genre], { nullable: 'itemsAndList' })
  async genres(@Parent() album: Album): Promise<Genre[]> {
    const { genresIds } = album;

    return await Promise.all(
      genresIds.map(id => this.genresService.getGenre(id)),
    );
  }
}
