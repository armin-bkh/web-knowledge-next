import {http} from "@/services/httpServices";

export function getCategories(){
    return http.get('/post-category');
}
