import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {RegistrationDetails} from '@myapp/_models/registrationDetail';
import {Router} from '@angular/router';
import {NotificationService} from '@myapp/_services/notificationService';
import {CommonDataService}  from '@myapp/_services/common-data-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regisForm:FormGroup;
  regisDetail:RegistrationDetails;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user:any={};

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private notificationService:NotificationService,
    private commonDataService: CommonDataService) { }

  ngOnInit(): void {
     this.regisForm = new FormGroup({
      firstName :new FormControl('',[

      ]),
      lastName :new FormControl('',[

      ]),
      email :new FormControl('',[

      ]),
      password :new FormControl('',[

      ]),
      matchingPassword :new FormControl('',[

      ])
     })
  }

  get f(){
    return this.regisForm.controls;
  }

  waitAndRedirect(){
    this.notificationService.openSnackBar('Registration Successfull , You will be redirected to login page','msg');
    setTimeout(() => {
      this.router.navigate(['login']);
  }, 5000);
  }

  onSubmit(): void {
    this.regisDetail=this.regisForm.getRawValue();
    console.log(this.regisDetail);
    this.commonDataService.post('registration',this.regisDetail).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.waitAndRedirect();
      }
    );
  }

}