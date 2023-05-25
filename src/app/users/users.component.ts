import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from './services/user-auth.service';
import { loginUser } from './Interfaces/users.interfaces';
import { jsDocComment } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public isLoginForm: boolean = true
  public validForm: boolean = false

  fromState() {
    this.isLoginForm = !this.isLoginForm
  }
  //using formBuilder
  // public signUpForm = this.fb.group({
  //   name:[],
  //   phone:[],
  //   email:[],
  //   password:[],
  //   confPass: [],
  //   profile_img:[]
  // }) 
  // using formGroup and formControl
  public signUpForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confPass: new FormControl(''),
    profile_img: new FormControl(''),
  })

  constructor(private fb: FormBuilder, private _userService: UserAuthService, private route: Router) {

  }
  onFileChange(event: any) {
    // console.log(event.target.files[0])
    this.signUpForm.controls.profile_img.patchValue(event.target.files[0])
  }

  resetUserForm() {
    this.signUpForm.reset()
    let fileInput = document.getElementById('file') as HTMLInputElement
    fileInput.value = ''
  }
  runtimePasswordChecking() {
    let passMsg = document.getElementById('passMSG') as HTMLTextAreaElement
    if (this.signUpForm.value.password === this.signUpForm.value.confPass) {
      console.log("pass matched");
      this.validForm = true
      passMsg.innerHTML = ""
    } else {
      console.log("pass not match");
      this.validForm = false
      passMsg.innerHTML = "  Password not match"
    }

  }
  signUp() {
    let userData = {
      name: this.signUpForm.value.name,
      phone: this.signUpForm.value.phone,
      email: this.signUpForm.value.email,
      pass1: this.signUpForm.value.password,
      avatar: this.signUpForm.value.profile_img
    }
    // console.log(userData)
    this._userService.signUpUser(userData).subscribe((res) => {
      console.log(res);
      this.resetUserForm()
    })
  }


  public loginForm: loginUser = {
    email: '',
    password: ''
  }
  resetLoginForm() {
    this.loginForm = {
      email: '',
      password: ''
    }
    let email = document.getElementById('loginEmail') as HTMLInputElement
    email.focus()
  }
  logIn() {
    this.route.navigateByUrl('/api-loader')
    // console.log(this.loginForm)
    let userLoginData = {
      email: this.loginForm.email,
      pass1: this.loginForm.password
    }

    this._userService.logInUser(userLoginData).subscribe((res: any) => {

      if (res && res.token && res.userActive){
        // this.resetLoginForm()
        setTimeout(() => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('userActive', res.userActive)
          this.route.navigateByUrl('/todo')
        }, 3000)
      } else{

        this.route.navigateByUrl('/user')
      }
    })
  }

}
