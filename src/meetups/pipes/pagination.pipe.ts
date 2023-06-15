import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform<number> {
  private defaultValue: number;

  constructor(defaultValue: number) {
    this.defaultValue = defaultValue;
  }

  transform(value: any): number {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return this.defaultValue;
    }

    return parsedValue;
  }
}
