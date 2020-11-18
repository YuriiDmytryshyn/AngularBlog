import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Blog } from '../shared/classes/blog.model';
import { User } from '../shared/classes/user.model';
import { IBlog } from '../shared/interfaces/blog.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  allBlogs: Array<IBlog> = [];
  allUsers: Array<IUser> = [];
  date = new Date();
  SignInCheack = false;
  AddPostCheack = false;
  SignUpCheack = false;
  IsLogin = false;
  IsCheack = true;
  whoWillFast: string;
  signInEmail: string;
  signInPassword: string | number;
  addPostTitle: string;
  addPostTextarea: string;
  IsChangeAddPost = true;
  editIndex: number;
  signUpUsername: string;
  signUpEmail: string;
  signUpPassword: string;
  edDel = true;


  constructor(private blogService: BlogService) { }


  ngOnInit(): void {
    this.getBlog();
    this.getUser();
  }

  newBlog() {
    if (this.addPostTitle.length !== 0 && this.addPostTextarea.length !== 0) {
      const newBlog = {
        id: 1,
        postedBy: this.whoWillFast,
        topic: this.addPostTitle,
        date: this.date,
        message: this.addPostTextarea
      }
      if (this.allBlogs.length >= 1) {
        newBlog.id = +this.allBlogs.slice(-1)[0].id + 1;
      }
      this.blogService.setBlog(newBlog);
      this.clearAddPost();
    } else {
      this.clearAddPost();
    }
  };

  signUpSubmit(): void {
    if (this.signUpUsername.length !== 0 && this.signUpEmail.length !== 0 && this.signUpPassword.length !== 0) {
      let foundUsername = this.allUsers.some(name => name.username === this.signUpUsername);
      let foundEmail = this.allUsers.some(email => email.email === this.signUpEmail);
      if (!foundUsername && !foundEmail) {
        const newUser = {
          id: 1,
          username: this.signUpUsername,
          email: this.signUpEmail,
          password: this.signUpPassword
        };
        if (this.allUsers.length >= 1) {
          newUser.id = +this.allUsers.slice(-1)[0].id + 1;
        }
        this.blogService.setUser(newUser);
        this.singUpClear();
      } else {
        this.singUpClear();
      }
    }
  };

  updateBlog() {
    if (this.addPostTitle.length !== 0 && this.addPostTextarea.length !== 0) {
      const upBlog = {
        id: this.editIndex,
        postedBy: this.whoWillFast,
        topic: this.addPostTitle,
        date: this.date,
        message: this.addPostTextarea
      };
      this.blogService.updatePost(upBlog);
      this.clearAddPost();
    } else {
      this.clearAddPost();
    }
  };

  signInClose(): void {
    this.SignInCheack = !this.SignInCheack;
    this.signInEmail = '';
    this.signInPassword = '';
  };

  signInSubmit(): void {
    console.log(this.allUsers);
    let email = this.signInEmail;
    let password = this.signInPassword;
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.edDel = true;
      console.log(this.edDel);
      this.whoWillFast = 'admin';
      this.IsLogin = true;
      this.IsCheack = !this.IsCheack;
      this.SignInCheack = !this.SignInCheack;
    } else {
      this.edDel = false;
      for (let i = 1; i < this.allUsers.length; i++) {
        if (this.allUsers[i].email === email && this.allUsers[i].password === password) {
          this.IsLogin = true;
          this.whoWillFast = this.allUsers[i].username;
          this.IsCheack = !this.IsCheack;
          this.SignInCheack = !this.SignInCheack;
        } else {
          this.SignInCheack = !this.SignInCheack;
        }
      }
    }
    console.log(this.whoWillFast);
  };

  signOut(): void {
    this.IsLogin = false;
    this.IsCheack = !this.IsCheack;
  };

  editPost(i: number): void {
    this.editIndex = i;
    this.IsChangeAddPost = false;
    this.AddPostCheack = !this.AddPostCheack;
    this.addPostTitle = this.allBlogs[i].topic;
    this.addPostTextarea = this.allBlogs[i].message;
  };

  private clearAddPost(): void {
    this.addPostTitle = '';
    this.addPostTextarea = '';
    this.IsChangeAddPost = true;
    this.AddPostCheack = !this.AddPostCheack;
  };

  getBlog(): void {
    this.allBlogs = this.blogService.blogs;
  };

  getUser(): void {
    this.allUsers = this.blogService.users;
  };

  deleteBlog(b: IBlog): void {
    this.blogService.deletePost(b.id);
  };


  SignUp(): void {
    this.SignUpCheack = !this.SignUpCheack;
  };

  private singUpClear(): void {
    this.signUpUsername = '';
    this.signUpEmail = '';
    this.signUpPassword = '';
    this.SignUpCheack = !this.SignUpCheack;
  };

}
