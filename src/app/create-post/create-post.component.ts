import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postBodyText: string;
  constructor(public authService: AuthService) {}

  ngOnInit() {}
  onSubmit(): void {
    const post = new Post({
      body: this.postBodyText,
      authorKey: this.authService.currentUserUid
    });
  }
}
