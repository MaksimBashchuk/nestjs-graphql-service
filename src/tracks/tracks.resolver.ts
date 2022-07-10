import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';

import { DeletedItem } from '../common/deletedItem.entity';
import { Track } from '../tracks/track.entity';
import { Artist } from '../artists/artist.entity';
import { Band } from '../bands/band.entity';
import { Genre } from '../genres/genre.entity';
import { Album } from '../albums/album.entity';

import { TracksService } from './tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { AlbumsService } from '../albums/albums.service';
import { GetTrackArgs } from './dto/getTrack.args';
import { CreateTrackArgs } from './dto/createTrack.args';
import { UpdateTrackArgs } from './dto/updateTrack.args';
import { PaginationArgs } from '../common/pagination.args';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
    private albumsService: AlbumsService,
  ) {}

  @ResolveField(() => Album, { nullable: true })
  async album(@Parent() track: Track): Promise<Album> {
    const { albumId } = track;

    return await this.albumsService.getAlbum(albumId);
  }

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

  @Query(() => Track, { nullable: true })
  track(@Args() { id }: GetTrackArgs): Promise<Track> {
    return this.tracksService.getTrack(id);
  }

  @Query(() => [Track])
  tracks(@Args() { limit, offset }: PaginationArgs): Promise<Track[]> {
    return this.tracksService.getAllTracks(limit, offset);
  }

  @Mutation(() => Track)
  @UseGuards(AuthGuard)
  createTrack(@Args() body: CreateTrackArgs) {
    return this.tracksService.createTrack(body);
  }

  @Mutation(() => DeletedItem, { nullable: true })
  @UseGuards(AuthGuard)
  deleteTrack(@Args() { id }: GetTrackArgs): Promise<DeletedItem> {
    return this.tracksService.deleteTrack(id);
  }

  @Mutation(() => Track)
  @UseGuards(AuthGuard)
  updateTrack(@Args() args: UpdateTrackArgs): Promise<Track> {
    return this.tracksService.updateTrack(args);
  }
}
