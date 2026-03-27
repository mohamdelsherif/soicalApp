import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Post, User } from '../../../core/models/post/post';
import { CommentComponent } from "../comment/comment.component";
import { PostDetailsComponent } from "../post-details/post-details.component";
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite, Modal } from 'flowbite';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth/auth.service';
import { PostService } from '../../../core/services/posts/post.service';
import { CreatecmmentComponent } from "./createcmment/createcmment.component";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PlatformService } from '../../../core/services/platform/platform.service';

@Component({
  selector: 'app-card-post',
  imports: [RouterLink, CreatecmmentComponent, CommentComponent, FormsModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css',
})
export class CardPostComponent {

  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly platformService: PlatformService = inject(PlatformService);
  private readonly postService: PostService = inject(PostService);
  private readonly toastr: ToastrService = inject(ToastrService)

  flowbiteModal!: any;
  @Input({ required: true }) post !: Post;
  @Output() postDeleted: EventEmitter<boolean> = new EventEmitter(false);
  @Output() postShared: EventEmitter<boolean> = new EventEmitter(false);
  @Input() displaybtn: boolean = false
  shareBody: string = '';
  user: User = {} as User;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getuserData();
  }

  deletepost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("the post delete successfully")
        this.postService.getAllposts().subscribe({
          next: (res) => {
            this.postDeleted.emit(true);
          }
        });
      }
    })
  }


  checkpost() {
    return this.authService.userData._id == this.post.user._id;
  }

  likeUnlikePost(postId: string) {
    this.postService.likeUnlikepost(postId).subscribe({
      next: (res) => {
        this.post.liked = res.data.liked;
        this.post.likesCount = res.data.likesCount;
        console.log("Updated liked status:", this.post.liked)
      }
    })
  }


  confirmShare(postId: string) {
    if (!this.shareBody.trim()) {
      this.toastr.warning("Please write something first");
      return;
    }

    this.postService.sharePost(postId, this.shareBody).subscribe({
      next: (res) => {
        this.toastr.success("Post shared successfully!");
        this.shareBody = '';


        const modal = document.querySelector('[data-modal-hide="share-modal"]') as HTMLButtonElement;
        modal?.click();

        this.post.sharesCount = res.data.sharesCount || this.post.sharesCount + 1;
        this.postService.getAllposts().subscribe({
          next: (res) => {
            this.postShared.emit(true);
          }
        });
      },
    });
  }
  getuserData() {
    if (this.platformService.isBrowser()) {

      this.user = this.authService.userData;
    }
  }
}
