import { Component, OnInit, OnDestroy } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TabsComponent } from "../home/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Course } from "../course.interface";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-coursecard',
  templateUrl: './coursecard.component.html',
  styleUrls: ['./coursecard.component.css']
})
export class CoursecardComponent implements OnInit {

  private id: number;
  course: any[];
  subscription: Subscription;
  width = document.documentElement.clientWidth;
  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
    $resizeEvent.subscribe(data => {
      this.width = data;
    });
   }

  ngOnInit() {
    this.courseService.getCourse(this.id)
    .subscribe(
          (response) => {
            this.course = response;   
            },
          (error: Response) => console.log(error)
        );
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
