import { ApiResponse_MediaCategorized, ApiResponse_MediaSearch } from "@/types/Assets";

export const FetchMovieCategorized = async (lang:string = "en"):Promise<ApiResponse_MediaCategorized> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/movie/categorized`,{
        headers: {
            "x-api-lang": lang
        }
    });
    return response.json();
}

export const FetchMovieSearch = async (lang:string = "en",title:string):Promise<ApiResponse_MediaSearch> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/movie/search?title=${title ?? ''}`,{
        headers: {
            "x-api-lang": lang
        }
    });
    return response.json();
}