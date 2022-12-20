import request from "@/utils/request";


export function getSearchSuggestion(q) {
     return request({
        method:"GET",
        url:"/v1_0/suggestion",
        params:{
            q
        }
     })
}