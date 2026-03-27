import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { FlowbiteService } from '../../../../core/services/flowbite/flowbite.service';
import { PlatformService } from '../../../../core/services/platform/platform.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../core/models/post/post';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createcmment',
  imports: [FormsModule],
  templateUrl: './createcmment.component.html',
  styleUrl: './createcmment.component.css',
})
export class CreatecmmentComponent {
  private readonly commentsService: CommentsService = inject(CommentsService);
  private readonly toastr: ToastrService = inject(ToastrService);
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly platformService: PlatformService = inject(PlatformService);

  @Input({ required: true }) postId !: string;
  @Output() commentAdded = new EventEmitter<void>();
  imgfile !: File | null;
  commentContent: string = '';
  imgPath: string = '';
  user: User = {} as User;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getuserData();
  }
  uploadFile(e: any): void {

    if (e.target?.files) {
      this.imgfile = e.target?.files[0];
      if (this.imgfile)
        this.imgPath = URL.createObjectURL(this.imgfile);
    }
  }

  creatcomment() {
    let formData = new FormData();
    if (this.imgfile)
      formData.set('image', this.imgfile);
    if (this.commentContent)
      formData.set('content', this.commentContent);

    this.commentsService.createComment(this.postId, formData).subscribe({
      next: (res) => {
        this.toastr.success('comment created successfully');

        this.commentContent = '';
        this.removeImg();
        this.commentAdded.emit();

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  removeImg() {
    if (this.imgPath) {
      URL.revokeObjectURL(this.imgPath); // مهم جداً للأداء
    }
    this.imgfile = null;
    this.imgPath = '';
  }
  getuserData() {
    if (this.platformService.isBrowser()) {

      this.user = this.authService.userData;
    }
  }

}
