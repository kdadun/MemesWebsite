import { Component, OnInit } from '@angular/core';
import { MemService } from '../shared/services/mem.service';
import { Mem } from '../shared/models/mem';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {

  listMemes: any;
  constructor(private memService: MemService) { }

  ngOnInit() {
    this.displayMemes();
  }

  displayMemes() {
    this.memService.getMemes().subscribe(data => {
      this.listMemes = data;
      console.log(this.listMemes);
    });
  }

}
