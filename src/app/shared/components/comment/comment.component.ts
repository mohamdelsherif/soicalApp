import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Comment } from '../../../core/models/comments/comment';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CreateReplyComponent } from "./createReply/create-reply.component";
import { RepliesComponent } from "./replies/replies.component";

@Component({
  selector: 'app-comment',
  imports: [DatePipe, CreateReplyComponent, RepliesComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input({ required: true }) postId !: string;
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly toastr: ToastrService = inject(ToastrService)
  private readonly commentService: CommentsService = inject(CommentsService);

  commnetList: Comment[] = [];

  openedReplyId: string | null = null;

  ngOnInit() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getComments();

  }

  getComments() {
    this.commentService.getPostComments(this.postId).subscribe(
      {
        next: (comments) => {
          this.commnetList = comments.data.comments;
          setTimeout(() => {
            initFlowbite();
          }, 0);
        },
        error: (error) => {
          console.error('Error fetching comments:', error);
        }
      }
    );
  }
  deleteComment(commentId: string): void {
    if (confirm('Are you sure you want to delete this comment?')) {

      this.commentService.deleteComment(this.postId, commentId).subscribe({
        next: (res) => {

          this.commnetList = this.commnetList.filter(comment => comment._id !== commentId);
          this.toastr.success('Comment deleted successfully');
        },
        error: (err) => {
          console.error('Delete Error:', err);
          this.toastr.error('Something went wrong, please try again');
        }
      });
    }
  }


  toggleReply(commentId: string) {
    this.openedReplyId = this.openedReplyId === commentId ? null : commentId;
  }
}
