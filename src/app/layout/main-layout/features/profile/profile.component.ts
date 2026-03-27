import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { Profile } from '../../../../core/models/profile/profile';
import { ToastrService } from 'ngx-toastr';
import { CardPostComponent } from "../../../../shared/components/card-post/card-post.component";
import { PostService } from '../../../../core/services/posts/post.service';
import { Post } from '../../../../core/models/post/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CardPostComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly profileService: ProfileService = inject(ProfileService)
  private readonly tostr: ToastrService = inject(ToastrService)
  private readonly postService: PostService = inject(PostService);
  myProfile !: Profile;
  myPost: Post[] = []


  imgFile: File | null = null; // تحديد النوع بدقة
  imgPath: string = '';
  ngOnInit() {
    this.getMyProfile()
    this.displayMyPosts()
  }

  getMyProfile() {
    this.profileService.getProfile().subscribe(
      {
        next: (res) => {
          this.myProfile = res.data.user;
          console.log(res.data.user)
          this.tostr.success("the profile data loaded successfully")
        },

      }
    )
  }


  uploadFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imgFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPath = reader.result as string;
      };
      reader.readAsDataURL(this.imgFile);
    }
  }

  updatePhoto(): void {
    if (!this.imgFile) return;

    const formData = new FormData();
    formData.append('photo', this.imgFile);

    this.profileService.uploadPhoto(formData).subscribe({
      next: (res) => {
        console.log('Upload Success', res);
        this.tostr.success("upload photo successfully ")
      },
      error: (err) => {
        console.error('Upload Error', err);
      }
    });
  }

  displayMyPosts() {
    this.postService.getHomeFeed().subscribe({
      next: (res) => {
        console.log(res.data.posts)
        this.tostr.success("your posts loaded successfully")
        this.myPost = res.data.posts
      }
    })
  }
}
