import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Global } from '../shared/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mem } from '../shared/models/mem';
import { MemService } from '../shared/services/mem.service';
import { SharedService } from '../shared/services/shared.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileToUpload: File = null;
  base64Encoded: any;
  memesForm: FormGroup;
  images = new Array<string>();
  tags = new Array<any>();
  showHide = false;
  displayFrofile: boolean;
  page = 1;
  displayRegistrationPanel: boolean;

  constructor(protected app: Global, private formBuilder: FormBuilder, private memService: MemService,
              ) { }

  ngOnInit() {
    this.formInitBuilder();

  }

  formInitBuilder() {
    this.memesForm = this.formBuilder.group ({
      memesName: [ '', Validators.required ],
      hashTags: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  uploadImage(file: FileList) {
    this.images = [];
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = () => {
          this.base64Encoded = reader.result;
          this.images.push(this.base64Encoded);
        };
    reader.readAsDataURL(this.fileToUpload);
    }

    onSubmit() {

      const mem: Mem = {
        Id: null,
        MemName: this.memesForm.controls.memesName.value,
        HashTags: this.tags,
        Image: this.base64Encoded,
        UserId: localStorage.getItem('userName')
      };
      this.memService.createMem(mem).subscribe( () => {
        this.showHide = false;
        this.memesForm.reset();
        this.images = [];
        this.tags = [];
        window.location.reload();
      });
    }

    addTags(title: string) {
      this.tags.push(title);
    }

    displayTags() {
      return this.tags;
    }
    deleteTags(index: number) {
      this.tags.splice(index, 1);
    }

    addTitle() {
      this.showHide = true;
    }

    cancel() {
      this.showHide = false;
      this.memesForm.reset();
      this.images = [];
      this.tags = [];
    }

}
