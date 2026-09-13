import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Service/AuthService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private AuthService = inject(AuthService);
  private Router = inject(Router);

  isLoggedIn() : boolean {
    return this.AuthService.isLoggedIn();
  }
  logout(): void{
    return this.AuthService.logout();
    this.Router.navigate(['/login']);
  }
}
