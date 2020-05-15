import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';

// Comment Form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    visibility(), flyInOut(), expand()
  ]
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  errMess: string;
  dishIds: Array<string>;
  prev: string;
  next: string;

  // Comment Form
  commentForm: FormGroup;
  comment: Comment;
  dishCopy: Dish;
  visibility= 'shown';
  
  @ViewChild('cForm') commentFormDirective;

  // Mat Slider
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  rating = 5;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  formErrors={
    'author': '',
    'rating': '',
    'comment': '',
  }

  validationMessages={
    'author':{
      'required': 'Author Name is required',
      'minlength': 'Author Name must be atleast 2 characters long',
      'maxlength': 'Author Name should not exceed 25 characters in length',
    },
    'rating':{
    },
    'comment':{
      'required': 'Comment shouldd not be empty.',
    }
  }

  constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder,
                @Inject('BaseURL') public BaseURL) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds()
        .subscribe((dishIds)=> {this.dishIds=dishIds});
    this.route.params
        .pipe(switchMap((params: Params) => {
          this.visibility='hidden';
          return this.dishService.getDish(params['id']);
        }))
        .subscribe((dish)=> {
            this.dish= dish;
            this.dishCopy= dish;
            this.setPrevNext(this.dish.id);
            this.visibility='shown';
          },
          errmess=> this.errMess=<any>errmess);
  }

  setPrevNext(dishId: string){
    const index= this.dishIds.indexOf(dishId);
    this.prev= this.dishIds[(this.dishIds.length + index-1)%this.dishIds.length];
    this.next= this.dishIds[(this.dishIds.length + index+1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm=this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25),]],
      rating: [this.rating],
      comment: ['', [Validators.required,]],
      date: [''],
    })
    this.commentForm.valueChanges
      .subscribe(data=> this.onValueChanged(data));
    
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.commentForm){return ;}
    const form= this.commentForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';  //clear previous error messages, if any
        const control= form.get(field)
        if (control && control.dirty && !control.valid){
          const messages= this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.comment= this.commentForm.value;
    this.comment['date']= (new Date()).toDateString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe(
        dish=>{
          this.dish= dish;
          this.dishCopy= dish
        },
        errmess => {
          this.dish= null;
          this.dishCopy= null;
          this.errMess=<any>errmess;
        }
      );
    console.log(this.dish);
    console.log(this.rating)
    this.commentForm.reset({
      author: [''],
      ratings: [this.max],
      comment: [''],
      date:[''],
    });
    this.commentFormDirective.resetForm({rating:this.max});
  }

}