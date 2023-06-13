import { Inject, Injectable } from '@nestjs/common';
import { Meetup } from 'src/entities';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject('MeetupsRepository') private readonly meetupsRepository: Meetup,
  ) {}
}
