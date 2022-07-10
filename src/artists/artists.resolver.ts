import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { DeletedItem } from '../common/deletedItem.entity';
import { Artist } from './artist.entity';
import { Band } from '../bands/band.entity';

import { ArtistsService } from './artists.service';
import { BandsService } from '../bands/bands.service';
import { CreateArtistArgs } from './dto/createArtist.args';
import { GetArtistArgs } from './dto/getArtist.args';
import { UpdateArtistArgs } from './dto/updateArtists.args';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Artist)
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {}

  @ResolveField(() => [Band], { nullable: 'itemsAndList' })
  async bands(@Parent() artist: Artist): Promise<Band[]> {
    const { bandsIds } = artist;

    return await Promise.all(bandsIds.map(id => this.bandsService.getBand(id)));
  }

  @Query(() => Artist, { nullable: true })
  artist(@Args() { id }: GetArtistArgs): Promise<Artist> {
    return this.artistsService.getArtist(id);
  }

  @Query(() => [Artist], { nullable: 'items' })
  artists(): Promise<Artist[]> {
    return this.artistsService.getAllArtists();
  }

  @Mutation(() => Artist)
  @UseGuards(AuthGuard)
  createArtist(@Args() body: CreateArtistArgs) {
    return this.artistsService.createArtist(body);
  }

  @Mutation(() => DeletedItem, { nullable: true })
  @UseGuards(AuthGuard)
  deleteArtist(@Args() { id }: GetArtistArgs): Promise<DeletedItem> {
    return this.artistsService.deleteArtist(id);
  }

  @Mutation(() => Artist)
  @UseGuards(AuthGuard)
  updateArtist(@Args() args: UpdateArtistArgs) {
    return this.artistsService.updateArtist(args);
  }
}
