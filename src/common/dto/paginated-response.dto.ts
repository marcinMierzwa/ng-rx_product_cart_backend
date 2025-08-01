import { IsArray } from "class-validator";

class PageMetaDto {
    readonly totalItems: number;
    readonly currentPage: number;
    readonly pageSize: number;
    readonly totalPages: number;

    constructor({ totalItems, currentPage, pageSize }: { totalItems: number, currentPage: number, pageSize: number }) {
        this.totalItems = totalItems,
        this.currentPage = currentPage,
        this.pageSize = pageSize,
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
}

export class PaginatedResponseDto<T> {

  @IsArray()
  readonly data: T[];
  readonly meta: PageMetaDto;

    constructor(data: T[], totalItems: number, page: number, pageSize: number) {
        this.data = data;
        this.meta = new PageMetaDto({ totalItems, currentPage: page, pageSize})
    }
}