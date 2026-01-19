import { StatusModel } from "../status/status.model";

export interface BookModel{
    id:string,
    title:string,
    author:string,
    imageUrl:string,
    rating:number,
    review:string,
    status: StatusModel,
}