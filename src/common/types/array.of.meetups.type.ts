import { Prisma } from '@prisma/client';

export type MeetupWithPlaceAndTags = Prisma.MeetupGetPayload<{
  include: {
    tags: {
      include: {
        tag: true;
      };
    };
    place: true;
  };
}>;
