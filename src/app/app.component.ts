import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{

 public loaderActive : boolean = true



  title = 'OnlineTodo-application';

  public isUser : boolean = false;
public activeUser : string = ''
  constructor(private route : Router){}

  ngOnInit(): void {
    let user = localStorage.getItem('userActive')
user ? this.activeUser = user : '';
    setTimeout(()=>{
      this.loaderActive= false
    },2000) 
  }

ngDoCheck(): void {
  let user = localStorage.getItem('userActive')

  if(user != null){
    this.isUser = true
  }

  
}
onUserLogout(){
  if(confirm('Really want to logout?'))
  localStorage.clear()
  this.isUser = false
this.route.navigateByUrl('/home')
}
}
