import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';

@Module({
  imports: [HttpModule],
  providers: [GenresService, GenresResolver],
})
export class GenresModule {}
