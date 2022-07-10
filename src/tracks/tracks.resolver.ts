import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

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
}
