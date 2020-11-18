import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog{
    constructor(
        public id: number | string,
        public postedBy: string,
        public topic: string,
        public date: Date,
        public message: string,
    ){}
}