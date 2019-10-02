import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

import { Menu } from './menu.model';

@Component({
  selector: 'app-admin-left-side',
  templateUrl: './admin-left-side.component.html',
  styleUrls: ['./admin-left-side.component.css']
})
export class AdminLeftSideComponent implements OnInit {

  menu$: Observable<Menu[]>;

  constructor(
    private authSrv: AuthService
  ) {
    this.menu$ = authSrv.getMenuPortal();
  }

  ngOnInit() {
  }

}
