import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.css']
})
export class MainLoaderComponent implements OnInit{

public isUser : boolean = false;
public userName : string = ''

ngOnInit(): void {
  let user = localStorage.getItem('userActive');
  
  if(user){
    this.userName = user
    this.isUser = true
  }
}


}
