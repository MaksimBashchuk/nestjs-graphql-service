import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DateScalar } from '../common/date.scalar';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';
import { GenresService } from '../genres/genres.service';

@Module({
  imports: [HttpModule],
  providers: [BandsResolver, BandsService, DateScalar, GenresService],
})
export class BandsModule {}
