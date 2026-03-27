import { Component, inject } from '@angular/core';
import { FollowersService } from '../../../../../core/services/followers/followers.service';
import { Follower } from '../../../../../core/models/follower/follower';
import { SearchFollowerPipe } from "../../../../../core/pipes/searchfollowers/search-follower-pipe";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-right-side',
  imports: [SearchFollowerPipe, FormsModule],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent {
  private readonly followersService: FollowersService = inject(FollowersService);
  private readonly toastr: ToastrService = inject(ToastrService);


  follwerList: Follower[] = [];
  inputData: string = ""
  ngOnInit() {
    this.getFollowers();
  }

  getFollowers() {
    this.followersService.getAllfolowers().subscribe((res) => {
      console.log(res);
      this.toastr.success("followers loaded successfully")
      this.follwerList = res.data.suggestions;
    });
  }
}
