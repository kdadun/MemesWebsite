import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'src/app/shared/models/rating';
import { Mem } from 'src/app/shared/models/mem';
import { Router } from '@angular/router';
import { MemService } from '../../shared/services/mem.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() memId: number;
  seleectedStars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  comment: string;
  commentList: Rating[];
  stars: any[];
  constructor(private router: Router, private memService: MemService) { }

  ngOnInit() {
    this.memService.getComment().subscribe(data => {
      this.commentList = data;
      this.commentList = this.commentList.filter(x => x.MemId === this.memId);
      this.commentList = this.commentList.map(comment => Object.assign(comment, {stars: new Array(comment.Rate)}));
    });
  }

  rateProduct(x) {
    this.selectedValue = x;
  }

  addComment() {
    this.memService.addComment(this.memId, this.selectedValue , this.comment).subscribe(() => {
    this.router.navigate(['/home']);
    });
  }
}
