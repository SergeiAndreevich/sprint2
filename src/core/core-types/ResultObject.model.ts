export type Result<T>={
    status: ResultStatus,
    data: T | null,
    error?: {
        field: string,
        message: string
    }
}

export enum ResultStatus {
    Success = 'success',
    Error = 'error',
    Unauthorized = 'unauthorized',
    NotFound = 'notFound',
}

export type acsessToken = string;