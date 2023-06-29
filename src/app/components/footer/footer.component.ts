import { Component } from '@angular/core';
import { cibInstagram, cibTwitter, cibTiktok, cibFacebook, cibLinkedin, cibYoutube } from '@coreui/icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icons = {cibInstagram, cibTwitter, cibTiktok, cibFacebook, cibLinkedin, cibYoutube}; 
}
