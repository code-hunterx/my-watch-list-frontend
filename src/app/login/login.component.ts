import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '@myapp/_services/token-storage.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NotificationService } from '@myapp/_services/notificationService';
import {CredentialDetails} from '@myapp/_models/registrationDetail';
import {CommonDataService}  from '@myapp/_services/common-data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  loading = false;
  errorMessage = '';
  roles: string[] = [];
  credentialDetails:CredentialDetails =new CredentialDetails();

  constructor(private commonDataService: CommonDataService,
     private tokenStorage: TokenStorageService,
     private router : Router,
     private route: ActivatedRoute,
     private notificationService:NotificationService) { }

  ngOnInit(): void {
    const token = this.tokenStorage.getToken();
    if (!token===undefined || token!=null) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      username:new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      password:new FormControl('',[
        Validators.required,
      ])
    });


  }

  get f() { return this.loginForm.controls; }

  get isEmptyEmail(){
    const userName =this.loginForm.get('username');
    return ((userName.invalid && userName.touched) || userName.dirty) &&(userName.errors?.required);
  }

  get isValidEmail(){
    const userName =this.loginForm.get('username');
    return ((userName.invalid && userName.touched) || userName.dirty) &&(userName.errors?.pattern)
  }

  get isEmptyPassword(){
    const passWord = this.loginForm.get('password');
    return ((passWord.invalid && passWord.touched) || passWord.dirty) &&(passWord.errors?.required);

  }

  onSubmit() {
     if (this.loginForm.invalid) {
       return;
     }
     this.credentialDetails = this.loginForm.getRawValue();
    this.commonDataService.post('authenticate',this.credentialDetails).subscribe(
      data => {
        if(!(data.email === undefined)){
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
           let params = this.route.snapshot.queryParams;
          this.notificationService.openSnackBar('Welcome','msg');
          if (params['redirectURL']) {
             this.router.navigateByUrl(params['redirectURL'])
             .catch(() => this.router.navigate(['home']))
          }else{
             this.router.navigate(['home'])
          }
        } else{
          this.isLoginFailed= true;
        }   
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}