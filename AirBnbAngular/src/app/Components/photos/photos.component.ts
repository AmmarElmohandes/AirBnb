import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Photos } from 'src/app/Models/photos';
import { AppState } from 'src/app/State/app.state';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  
  constructor(private httpclient:HttpClient,private store:Store<AppState>,private sanitizer:DomSanitizer) {this.propertyId=store.select('propertyId') }
  propertyId:Observable<number>
  photo:Photos=new Photos(0,"",0)
  ngOnInit(): void {
  }
imgsrc:string="";
sanitizeImageUrl(imageUrl: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
  public uploadFile(files:any)  {
      if (files.length === 0) {
        console.log("empty file")
        return 0;
      }
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
     this.photo.ImageName=fileToUpload.name;
     let currentPageSub :Subscription;

     currentPageSub = this.propertyId.subscribe(
   (propertyId: number) => {
       this.photo.PropertyId=propertyId;
       console.log(propertyId)
       console.log(this.photo.PropertyId)
   }
  );
      return this.httpclient.post("http://localhost:9095/api/photos",this.photo).subscribe((a:any)=>{this.load(formData);this.imgsrc="http://127.0.0.1:8887/"+a.imageName;console.log(a)});
    
    }
    public load(formData:FormData){
             return this.httpclient.post("http://localhost:9095/api/photos/upload",formData).subscribe(r=>console.log(r))
    }


}
