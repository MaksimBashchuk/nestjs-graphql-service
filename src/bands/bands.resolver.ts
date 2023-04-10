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
import { Band } from './band.entity';
import { Genre } from '../genres/genre.entity';

import { BandsService } from './bands.service';
import { GenresService } from '../genres/genres.service';
import { CreateBandArgs } from './dto/createBand.args';
import { GetBandArgs } from './dto/getBand.args';
import { UpdateBandArgs } from './dto/updateBand.args';
import { PaginationArgs } from '../common/pagination.args';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Band)
export class BandsResolver {
  constructor(
    private bandsService: BandsService,
    private genresService: GenresService,
  ) {}

  @ResolveField(() => [Genre], { nullable: 'itemsAndList' })
  async genres(@Parent() band: Band): Promise<Genre[]> {
    const { genresIds } = band;

    return await Promise.all(
      genresIds.map(id => this.genresService.getGenre(id)),
    );
  }

  @Query(() => Band, { nullable: true })
  band(@Args() { id }: GetBandArgs): Promise<Band> {
    return this.bandsService.getBand(id);
  }

  @Query(() => [Band], { nullable: 'items' })
  bands(@Args() { limit, offset }: PaginationArgs): Promise<Band[]> {
    return this.bandsService.getAllBands(limit, offset);
  }

  @Mutation(() => Band)
  @UseGuards(AuthGuard)
  createBand(@Args() body: CreateBandArgs) {
    return this.bandsService.createBand(body);
  }

  @Mutation(() => DeletedItem, { nullable: true })
  @UseGuards(AuthGuard)
  deleteBand(@Args() { id }: GetBandArgs): Promise<DeletedItem> {
    return this.bandsService.deleteBand(id);
  }

  @Mutation(() => Band)
  @UseGuards(AuthGuard)
  updateBand(@Args() args: UpdateBandArgs): Promise<Band> {
    return this.bandsService.updateBand(args);
  }
}
