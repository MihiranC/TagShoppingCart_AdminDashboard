import { Component, OnInit, ElementRef } from '@angular/core';
import { PagesService } from '../Services/Pages.service';
import { PageHeaders } from '../Models/PageHeaders';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Route } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})

export class CommonLayoutComponent implements OnInit {

  title = 'TagSPAdminMaster';

  pageHeaders: PageHeaders[]
  location: Location;

  root: string
  currentPage: string

  constructor(location: Location, private element: ElementRef, private pagesService: PagesService) {
    this.location = location;
  }

  ngOnInit(): void {
    var title = this.location.prepareExternalUrl(this.location.path()).replace("#", "");
    if(title=="#/"){
      setTimeout(() => {
        this.toggleMenu();
      }, 20);
    }
    else{
      this.toggleMenu();
    }
  }

  toggleMenu() {
    var title = this.location.prepareExternalUrl(this.location.path()).replace("#", "");
    console.log('topic', title)
    this.pagesService.ReturnPages(1).subscribe(response => {
      this.pageHeaders = response.data;
      for (var item = 0; item < this.pageHeaders.length; item++) {
        console.log('pages con', this.pageHeaders)
        for (var page = 0; page < this.pageHeaders[item]['pages'].length; page++) {
          console.log('pages con', this.pageHeaders[item]['pages'][page].path.toString())
          if (title === this.pageHeaders[item]['pages'][page].path.toString()) {
            this.pageHeaders[item]['pages'][page].class = "active";
            this.pageHeaders[item].class = "menu-open";
            this.root = this.pageHeaders[item].headerName;
            this.currentPage = this.pageHeaders[item]['pages'][page].pageName
          }
          if (this.pageHeaders[item]['pages'][page].pageName.length > 20) {

            this.pageHeaders[item]['pages'][page].fontsize = "0.85";
          }
        }
      }
    });
    console.log('pageHeaders', this.pageHeaders)
  }

}
