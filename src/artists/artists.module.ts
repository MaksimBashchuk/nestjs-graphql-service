import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DateScalar } from '../common/date.scalar';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';

@Module({
  imports: [HttpModule],
  providers: [ArtistsResolver, ArtistsService, DateScalar],
})
export class ArtistsModule {}
