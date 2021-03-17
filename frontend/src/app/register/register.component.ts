import { UserService } from './../_services';
import { first } from 'rxjs/operators';
import { User } from './user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  loading: boolean;
  submitted: boolean;
  registerForm: FormGroup;
  returnUrl: string;
  error: string;  
  data: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password: ['', Validators.required],
        c_password: ['', Validators.required],
      });
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    get f(){ return this.registerForm.controls};
    
    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;

      let formData = {
        username: this.f.username.value,
        email: this.f.email.value,
        firstname: this.f.lastname.value,
        lastname: this.f.lastname.value,
        password: this.f.password.value,
        c_password: this.f.c_password.value,
      };
      this.authenticationService.backEndCall(formData, 'register')
        .then(()=>{
            this.router.navigate([this.returnUrl]);
        })
        .catch(error => {            
            this.error = error;
            this.loading = false;
        });
  }

}
