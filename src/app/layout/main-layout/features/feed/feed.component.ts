import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CardPostComponent } from "../../../../shared/components/card-post/card-post.component";
import { PostService } from '../../../../core/services/posts/post.service';
import { Post } from '../../../../core/models/post/post';
import { CreatePostComponent } from '../../../../shared/components/create-post/create-post.component';
import { RouterLink } from '@angular/router';
import { RightSideComponent } from "./right-side/right-side.component";
import { LeftSideComponent } from "./left-side/left-side.component";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feed',
  imports: [CardPostComponent, CreatePostComponent, RightSideComponent, LeftSideComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly postService: PostService = inject(PostService);
  private readonly toastr: ToastrService = inject(ToastrService);


  allposts: Post[] = [];

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.displayPosts();
  }


  displayPosts() {
    return this.postService.getAllposts().subscribe(
      {
        next: (posts) => {
          this.toastr.success('Posts loaded successfully');
          this.allposts = posts.data.posts;
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      }
    );
  }
  refrashPosts(event: boolean) {
    if (event) {
      this.displayPosts();
    }
  }
}
