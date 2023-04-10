import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';
import { GenresService } from '../genres/genres.service';

@Module({
  imports: [HttpModule],
  providers: [BandsResolver, BandsService, GenresService],
})
export class BandsModule {}
