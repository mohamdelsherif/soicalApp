import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { User } from '../../../../core/models/post/post';
import { FlowbiteService } from '../../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-reply',
  imports: [FormsModule],
  templateUrl: './create-reply.component.html',
  styleUrl: './create-reply.component.css',
})
export class CreateReplyComponent {
  private readonly commentsService = inject(CommentsService);
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastr: ToastrService = inject(ToastrService);
  private readonly platformService: PlatformService = inject(PlatformService);

  @Input({ required: true }) postId!: string;
  @Input({ required: true }) commentId!: string;
  @Input() replyToName!: string;
  @Output() replyAdded = new EventEmitter<void>();

  imgfile !: File | null;
  replyContent: string = '';
  imgPath: string = '';
  user: User = {} as User;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getuserData();
  }
  uploadFile(e: any): void {
    if (e.target?.files && e.target.files.length > 0) {
      this.imgfile = e.target.files[0];
      if (this.imgfile) {
        this.imgPath = URL.createObjectURL(this.imgfile);
      }
    }
  }
  sendReply() {
    const formData = new FormData();


    if (this.replyContent.trim()) {
      formData.append('content', this.replyContent);
    }


    if (this.imgfile) {
      formData.append('image', this.imgfile);
    }


    if (!this.replyContent.trim() && !this.imgfile) {
      this.toastr.warning("Please write something or upload an image");
      return;
    }

    this.commentsService.createReply(this.postId, this.commentId, formData).subscribe({
      next: (res) => {
        this.toastr.success("Reply created successfully");
        console.log("Response after create:", res);
        this.replyContent = '';
        this.removeImg();
        this.replyAdded.emit();
      },
      error: (err) => {

        this.toastr.error(err.error?.message || "Failed to create reply");
      }
    });
  }

  removeImg() {
    if (this.imgPath) {
      URL.revokeObjectURL(this.imgPath);
    }
    this.imgfile = null;
    this.imgPath = '';
    const input = document.getElementById('reply-image') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
  getuserData() {
    if (this.platformService.isBrowser()) {

      this.user = this.authService.userData;
    }
  }
}
