export interface FinalsTrackerResponse<T> {
    data?: T;
    errors?: string[];
}

export interface FinalsTrackerSuccessResponse<T> {
    data: T;
}

export interface FinalsTrackerErrorResponse {
    errors: string[];
}
