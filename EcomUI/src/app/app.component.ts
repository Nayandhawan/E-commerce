import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('buttonHover', [
      state('normal', style({
        transform: 'scale(1)',
        backgroundColor: '#fff' // Default button color
      })),
      state('hovered', style({
        transform: 'scale(1.1)',
        backgroundColor: '#e0e0e0' // Color when hovered
      })),
      transition('normal <=> hovered', animate('300ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  buttonStates: { [key: string]: string } = {
    'trackOrder': 'normal',
    'register': 'normal',
    'login': 'normal'
  };
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();

  constructor(private router : Router){}

  ngOnInit():void {
    this.router.events.subscribe(events =>{
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLoggedIn  = UserStorageService.isCustomerLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  onMouseEnter(button: string) {
    this.buttonStates[button] = 'hovered';
  }

  onMouseLeave(button: string) {
    this.buttonStates[button] = 'normal';
  }
}
