import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { BandsService } from '../bands/bands.service';

@Module({
  imports: [HttpModule],
  providers: [ArtistsResolver, ArtistsService, BandsService],
})
export class ArtistsModule {}
