import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Reply } from '../../../../core/models/reply/reply';

@Component({
  selector: 'app-replies',
  imports: [DatePipe],
  templateUrl: './replies.component.html',
  styleUrl: './replies.component.css',
})
export class RepliesComponent {
  private readonly commentsService: CommentsService = inject(CommentsService);
  private readonly toastr: ToastrService = inject(ToastrService);


  @Input({ required: true }) postId!: string;
  @Input({ required: true }) commentId!: string;

  repliesList: Reply[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadReplies();
  }

  loadReplies() {
    this.isLoading = true;
    this.commentsService.getCommentReply(this.postId, this.commentId).subscribe({
      next: (res) => {
        // الطريقة الصح
        console.log("the replies is:", res.data.replies);
        console.log("the postid  is:", this.postId);
        console.log("the comment id is:", this.commentId);
        this.repliesList = res?.data?.replies || [];
        this.isLoading = false;
        this.toastr.success("replies loaded successfully")
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
