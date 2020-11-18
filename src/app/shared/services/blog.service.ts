import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  date = new Date();

  blogs: Array<IBlog> = [
    {
      id: 0,
      postedBy: 'admin',
      topic: 'First post',
      date: this.date,
      message: 'Sing up to create your account and start to use Angular Blog'
    }
  ];
  users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    }
  ];

  constructor() { }

  getBlogs(): Array<IBlog>{
    return this.blogs;
  };

  getUsers(): Array<IUser>{
    return this.users;
  };

  setBlog(newPost: IBlog): void{
    this.blogs.push(newPost);
  }

  setUser(newUser: IUser): void{
    this.users.push(newUser);
  }

  deletePost(id: number | string): void{
    const index = this.blogs.findIndex(d => d.id === id);
    this.blogs.splice(index, 1);
  }

  updatePost(post: IBlog): void{
    const index = this.blogs.findIndex(d => d.id === post.id);
    this.blogs.splice(index, 1, post);
  }
}
