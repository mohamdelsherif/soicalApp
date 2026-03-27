import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/posts/post.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/post/post';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {

  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly postService: PostService = inject(PostService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly platformService: PlatformService = inject(PlatformService);
  private readonly toastr: ToastrService = inject(ToastrService);


  @Output() postCreated: EventEmitter<boolean> = new EventEmitter(false);

  imgfile !: File | null;
  postContent: string = '';
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

  creatPost() {
    let formData = new FormData();
    if (this.imgfile)
      formData.set('image', this.imgfile);
    if (this.postContent)
      formData.set('body', this.postContent);

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        this.toastr.success('Post created successfully');
        this.postService.getAllposts().subscribe({
          next: (res) => {
            this.postCreated.emit(true);
          }
        });

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  removeImg() {
    this.imgfile = null;
    this.imgPath = '';

  }
  getuserData() {
    if (this.platformService.isBrowser()) {

      this.user = this.authService.userData;
    }
  }


}
