export interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface IGetPhotosResult {
    result: boolean;
    posts: IPhoto[] | null;
    totalResults: number | null;
}

export interface IGetPaginatePhotos {
    page: number;
    size: number;
}

export interface IGetPhotosById {
    id: number;
}

export interface IGetPhotosByIdResult {
    result: boolean;
    post: IPhoto | null;
}