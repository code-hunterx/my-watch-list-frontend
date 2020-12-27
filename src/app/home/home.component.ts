import { Component, OnInit } from '@angular/core';
import {Router,NavigationEnd, } from '@angular/router';
import {MediaObserver,MediaChange} from '@angular/flex-layout';
import {Subscription}  from 'rxjs';
import {CommonDataService} from '@myapp/_services/common-data-service.service';
import {DomSanitizer} from  '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  mediaSub:Subscription;
  deviceXs:boolean;
  mediaItems:any[];

  constructor(private router:Router,
    public mediaObserver:MediaObserver,private commonDataService:CommonDataService,
    private sanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((result:MediaChange[])=>{
      this.deviceXs=result[0].mqAlias ==='xs'?true:false;
    });
    this.commonDataService.get('userMediaHistory').subscribe(
      data=>{
        if(data instanceof Array){
          this.mediaItems=data;
        }
      })
    
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  scrollRight (position:number) {
    document.getElementsByClassName('scrolling-wrapper-flexbox')[position].scrollLeft += 20;
  };

  scrollLeft (position:number) {
    document.getElementsByClassName('scrolling-wrapper-flexbox')[position].scrollLeft -= 20;
  };

  getLeftScrollPosition(position:number){
    return document.getElementsByClassName('scrolling-wrapper-flexbox')[position].scrollLeft !=0;
  }

  getRightScrollPosition(position:number){
    
    return document.getElementsByClassName('scrolling-wrapper-flexbox')[position].scrollLeft !=document.getElementsByClassName('scrolling-wrapper-flexbox')[position].scrollWidth;
  }

  getImagePath(data){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + data);
  }
}