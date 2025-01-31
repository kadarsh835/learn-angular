import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType= ContactType;

  @ViewChild('fform') feedbackFormDirective;

  formErrors= {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  validationMessages= {
    'firstname': {
      'required': 'Firstname is required.',
      'minlength': 'Firstname must be atleast 2 characters long.',
      'maxlength': 'Firstname cannot be more than 25 characters long',
    },
    'lastname': {
      'required': 'Lastname is required.',
      'minlength': 'Lastname must be atleast 2 characters long.',
      'maxlength': 'Lastname cannot be more than 25 characters long',
    },
    'telnum': {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. number must contain only numbers.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.',
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm= this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: '',
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data))

    this.onValueChanged();  // (Re)set the form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){return ;}
    const form= this.feedbackForm;
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
    this.feedback= this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }

}