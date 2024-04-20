import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEdit: boolean = false
  selectedFile: any;
  name: String = ''
  imgSrc : string = ''

  // a = new (window as any).bootstrap.Modal('modal');

  updateInfoForm: FormGroup = new FormGroup({
    userName: new FormControl(null),
    bio: new FormControl(null)
  })
  Edit() {
    this.isEdit = !this.isEdit
  }

  uploadImage() {
    document.getElementById('upload')?.click()
  }

  onFileSelected(e: any) {
    console.log(e.target?.files[0]);
    this.name = `../../assets/avatars/${e.target?.files[0].name}`


  }

 
  onSelectImage(imgSrc: string): void {
    this.imgSrc = imgSrc
  }

  setProfilePicture(): void {
    console.log(this.imgSrc);
    
  }



  userInfo() {
    console.log('done');
    this.isEdit = false
  }
  constructor() { }

  ngOnInit(): void {
  }

}
