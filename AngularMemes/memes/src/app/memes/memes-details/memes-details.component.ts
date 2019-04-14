import { Component, OnInit } from '@angular/core';
import { MemService } from 'src/app/shared/services/mem.service';
import { ActivatedRoute } from '@angular/router';
import { Mem } from 'src/app/shared/models/mem';
@Component({
  selector: 'app-memes-details',
  templateUrl: './memes-details.component.html',
  styleUrls: ['./memes-details.component.css']
})
export class MemesDetailsComponent implements OnInit {
  mem: Mem;
  id: number;
  constructor(private memService: MemService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadMemes();
  }
  loadMemes() {
    // tslint:disable-next-line:no-string-literal
    this.id = +this.activeRoute.snapshot.params['id'];
    this.memService.getMemById(this.id).subscribe((data) => {
     this.mem = data;
    });
  }
}
