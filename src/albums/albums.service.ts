import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from 'src/common/deletedItem.entity';
import { Album } from './album.entity';
// import { CreateAlbumArgs } from './dto/createAlbum.args';
// import { UpdateAlbumArgs } from './dto/updateAlbum.args';

import { BASE_ALBUMS_URL } from './constatns';

@Injectable()
export class AlbumsService {}
