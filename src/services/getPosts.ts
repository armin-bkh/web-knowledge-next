import {http} from "@/services/httpServices";

export function getPosts(query?: string){
    return http.get(`/posts?${query}`);
}
