import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-reviews-feedback',
  templateUrl: './reviews-feedback.component.html',
  styleUrls: ['./reviews-feedback.component.css']
})
export class ReviewsFeedbackComponent implements OnInit {

  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
  ];


  //The time to show the next photo
  public NextPhotoInterval:number = 5000;
  //Looping or not
  public noLoopSlides:boolean = false;
  //Photos
  public slides:Array<any> = [];
  public slidescontent:Array<any> = [];
  wasClicked = false;
  hasClicked = false;
  hasedClicked = false;
  
      onClick() {
          this.wasClicked= true;
      }
      onhasClick() {
        this.hasClicked= true;
    }

    onhasedClick() {
      this.hasedClicked= true;
  }
  constructor() {
    this.addNewSlide();
   }

   public addNewSlide() {
    this.slides.push(
       {image:'../../assets/img/banner01.jpg',title:'Course Reviews'},
       {image:'../../assets/img/banner02.jpg',title:'Teacher Reviews'},
       {image:'../../assets/img/banner03.jpg',title:'Tools and Trainings for Improving your ratings'},
   );
}

public removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}