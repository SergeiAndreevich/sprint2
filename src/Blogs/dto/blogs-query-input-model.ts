import {BlogSortsFields, PaginationAndSorting} from "../../core/core-types/pagination-and-sorting";

// export type BlogsQueryInput = PaginationAndSorting<BlogSortsFields> &
//     Partial<{
//         searchNameTerm: string;
//     }>;
// Определите типы для параметров запроса и результата
export type QueryParams = {
    pageNumber?: string;
    pageSize?: string;
    sortBy?: string;
    sortDirection?: string;
    searchNameTerm?: string; // Добавляем searchNameTerm
    [key: string]: string | undefined; // Разрешаем другие параметры
}

export type FilterResult = {
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortDirection: string; // Или number, если вы используете числа для направления
    searchNameTerm?: string; // Добавляем searchNameTerm (необязательный)
}