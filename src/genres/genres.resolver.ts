import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DeletedItem } from '../common/deletedItem.entity';
import { Genre } from './genre.entity';

import { GenresService } from './genres.service';
import { CreateGenreArgs } from './dto/createGenre.args';
import { GetGenreArgs } from './dto/getGenre.args';
import { UpdateGenreArgs } from './dto/updateGenre.args';
import { PaginationArgs } from '../common/pagination.args';

import { AuthGuard } from '../users/auth.guard';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => Genre, { nullable: true })
  genre(@Args() { id }: GetGenreArgs): Promise<Genre> {
    return this.genresService.getGenre(id);
  }

  @Query(() => [Genre], { nullable: 'items' })
  genres(@Args() { limit, offset }: PaginationArgs): Promise<Genre[]> {
    return this.genresService.getAllGenres(limit, offset);
  }

  @Mutation(() => Genre)
  @UseGuards(AuthGuard)
  createGenre(@Args() body: CreateGenreArgs) {
    return this.genresService.createGenre(body);
  }

  @Mutation(() => DeletedItem, { nullable: true })
  @UseGuards(AuthGuard)
  deleteGenre(@Args() { id }: GetGenreArgs): Promise<DeletedItem> {
    return this.genresService.deleteGenre(id);
  }

  @Mutation(() => Genre)
  @UseGuards(AuthGuard)
  updateGenre(@Args() args: UpdateGenreArgs) {
    return this.genresService.updateGenre(args);
  }
}
