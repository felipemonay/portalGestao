import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  profile: any;

  carrinho = [{
      'iten': ''
  }];
  constructor(
    private authService: AuthService
  ) {
    this.profile = this.authService.getProfile();
  }

  ngOnInit() {
  }

  logout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}
