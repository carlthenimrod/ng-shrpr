import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Institution } from "../../institution/institution.interface";
import { InstitutionService } from "../../institution/institution.service";

@Component({
  selector: 'profile-institution',
  templateUrl: './profile-institution.component.html',
  styleUrls: ['./profile-institution.component.css']
})
export class ProfileInstitutionComponent implements OnInit, OnDestroy {

  institutions:any;
  private id:number;
  courses: any[];
  courseData: any;
  courseTotal: string = '';
  //subscription: Subscription;
  private subscriptions = new Subscription();
  
  details:any;
  
  width = document.documentElement.clientWidth;

  constructor(private institutionService: InstitutionService, private route: ActivatedRoute) { 
    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
        if(params['id'] == 'the-next-street'){
          this.id = 3;
        }
        else{
          this.id = params['id'];
        }
      }))
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));
  }
  
  ngOnInit() {
       this.subscriptions.add(this.institutionService.getInstitution(this.id)
     .subscribe(
       (response) => {
        this.institutions = response;
        this.details = JSON.parse(response.details);
        this.courses = this.institutions.courses;
        this.courseData = this.courses;
        },
       (error: Response) => console.log(error)
     ));
     
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  filter(courses){
    this.courseData = courses;
  }
}