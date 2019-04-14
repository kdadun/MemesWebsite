import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-set-image',
  templateUrl: './set-image.component.html',
  styleUrls: ['./set-image.component.css']
})
export class SetImageComponent implements OnInit {
  currentImage: any;
  base64Encoded: any;
  fileToUpload: File = null;
  imageForm: FormGroup;
  images = new Array<any>();
  constructor(private formBuilder: FormBuilder, protected authentication: AuthenticationService) { }

  ngOnInit() {
    this.formInitImageForm();
    this.getImage();
  }

  formInitImageForm() {
    this.imageForm = this.formBuilder.group ({
     image: []
    });
  }
  getImage() {
    this.authentication.getUserProfile().subscribe( (data: any) => {
       this.currentImage = data.Image;
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
    this.imageForm.controls.image.setValue(file.item(0).name ? '' : '');
    }

    onSubmit() {
      this.authentication.changeImage(this.base64Encoded).subscribe(() => {
        this.images = [];
        window.location.reload();
       });
    }
}
