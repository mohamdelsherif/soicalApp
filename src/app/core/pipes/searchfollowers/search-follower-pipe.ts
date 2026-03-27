import { Pipe, PipeTransform } from '@angular/core';
import { Follower } from '../../models/follower/follower';

@Pipe({
  name: 'searchFollower'
})
export class SearchFollowerPipe implements PipeTransform {

  transform(followerList: Follower[], searchWord: string): Follower[] {


    return followerList.filter((item) => item.name.toLowerCase().includes(searchWord.toLowerCase()));


  }

}
