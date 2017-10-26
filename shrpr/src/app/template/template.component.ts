import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LikeService } from "../like.service";

declare var google;

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  
  constructor() {
     
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
  providers:[]
})

export class TemplateHeader implements OnInit, OnDestroy {

  isheaderShrunk: boolean = false;
  isBtnActive: boolean = false;
  location: string = '';
  counter: number = 0;
  subscription: Subscription;
  groups = ['For Fun', 'For Work', 'For Kids'];

  constructor(zone: NgZone, private likeService: LikeService) {
    window.onscroll = () => {
      zone.run(() => {
        if(window.pageYOffset > 0) {
             this.isheaderShrunk = true;
        } else {
             this.isheaderShrunk = false;
        }
      });
    }
  }

  ngOnInit() {

    this.subscription = this.likeService.getCounter().subscribe((count) => {
      this.counter = count;
    });

    if (navigator.geolocation) { //check if we can get lat/lng

      //create location
      navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);

        let request = {
          latLng: latlng
        };

        //reverse geocode
        geocoder.geocode(request, (results, status) => {

          if (status == google.maps.GeocoderStatus.OK) {

            if (results[0] != null) {

              //get location
              this.location = this.findLocation(results[0].address_components);
            }
          }
        });
      });
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this.isBtnActive = !this.isBtnActive;
  }

  findLocation(components){      

    var city = false,
        state = false,
        zip = false,
        component,
        i, l, x, y;

      for(i = 0, l = components.length; i < l; ++i){

        //store component
        component = components[i];

        //check each type
        for(x = 0, y = component.types.length; x < y; ++ x){

          //depending on type, assign to var
          switch(component.types[x]){

            case 'neighborhood':
            city = component.long_name;
            break;

            case 'administrative_area_level_1':
            state = component.short_name;
            break;

            case 'postal_code':
            zip = component.short_name;
            break;
          }
        }
      }

      if(city && state && zip){

        return city + ', ' + state + ' ' + zip;
      }
      else if (city && state) { 

        return city + ', ' + state;
      } else {

        return '';
      }
  }
  
}

@Component({
  selector: 'app-footer',
  templateUrl: './template.footer.html',
  styleUrls: ['./template.footer.css']
})
export class TemplateFooter implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}