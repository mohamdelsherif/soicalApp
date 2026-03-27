import { Component, inject, Input } from '@angular/core';
import { Post } from '../../../core/models/post/post';
import { CardPostComponent } from "../card-post/card-post.component";
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/posts/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-details',
  imports: [CardPostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly postService: PostService = inject(PostService);
  private readonly tostr: ToastrService = inject(ToastrService)
  postDetails !: Post;

  ngOnInit(): void {
    this.displaySinglePost()
  }

  displaySinglePost() {
    this.activatedRoute.paramMap.subscribe((res) => {
      let id = res.get("id");
      console.log(id)
      this.postService.getSinglePost(id).subscribe({
        next: (res) => {
          this.tostr.success("the post details loaded done")
          console.log(res);
          this.postDetails = res.data.post;
        },
        error: (err) => {
          console.error(err);
        }
      });

    })
  }
}
