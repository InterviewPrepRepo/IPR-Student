import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { InviteService } from 'src/app/services/invite-service/invite.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public invite : InviteService, public auth : AuthService) { 

  }
}
