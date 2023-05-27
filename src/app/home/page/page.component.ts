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
    let month = now.getMonth().toString()
    //find month
    switch (month) {
      case '0':
        month = 'January'
        break
      case '1':
        month = 'February'
        break
      case '2':
        month = 'March'
        break
      case '3':
        month = 'April'
        break
      case '4':
        month = 'May'
        break
      case '5':
        month = 'June'
        break
      case '6':
        month = 'July'
        break
      case '7':
        month = 'Augest'
        break
      case '8':
        month = 'September'
        break
      case '9':
        month = 'October'
        break
      case '10':
        month = 'November'
        break
      case '11':
        month = 'December'
        break
    }

    this.currentDate = now.getDate().toString() + " - " + month + " - " + now.getFullYear()
    this.hourHandTransform = `rotate(${hourRotation}deg)`;
    this.minuteHandTransform = `rotate(${minuteRotation}deg)`;
    this.secondHandTransform = `rotate(${secondRotation}deg)`;
  }


}
