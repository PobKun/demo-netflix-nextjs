export type CategoriesType = "Series"|"Cartoon"|"Movie"|"TvShow"

export type MediaItemType = {
    id: number;
    title: string;
    type: string;
    synopsis: string;
    trailer_embed_url: string;
    image: string;
    image_cover: string;
    top10: number;
    popular: boolean;
};
  
export type MediaCategorizedType = Record<CategoriesType, MediaItemType[]> & {
    Popular: MediaItemType[];
};

export type ApiResponseType<T> = {
    success: boolean;
    statusCode: number;
    errors: null;
    message: string;
    data: T;
};

export type ApiResponse_MediaCategorized = ApiResponseType<MediaCategorizedType>
export type ApiResponse_MediaSearch = ApiResponseType<MediaItemType[]>
export type ApiResponse_MediaID = ApiResponseType<MediaItemType>