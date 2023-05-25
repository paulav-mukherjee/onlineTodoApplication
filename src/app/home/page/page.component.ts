import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, DoCheck {

  hourHandTransform: string = '';
  minuteHandTransform: string = '';
  secondHandTransform: string = '';
  isUser: boolean = false
  currentDate: string = ''

  ngOnInit() {
    this.updateClockHands();

    setInterval(() => {
      this.updateClockHands();
    }, 1000);

    
  }
ngDoCheck(): void {
  let user = localStorage.getItem('userActive')
    if (user === null) {
      this.isUser = true
    }
}


  updateClockHands() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourRotation = (hours % 12) * 30 + (minutes / 2);
    const minuteRotation = minutes * 6;
    const secondRotation = seconds * 6;

    this.currentDate = now.getDate().toString()+ " - "+ now.getMonth()+ " - " + now.getFullYear()
    this.hourHandTransform = `rotate(${hourRotation}deg)`;
    this.minuteHandTransform = `rotate(${minuteRotation}deg)`;
    this.secondHandTransform = `rotate(${secondRotation}deg)`;
  }


}
