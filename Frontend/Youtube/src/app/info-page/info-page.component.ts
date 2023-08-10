import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {


    if (this.authService.getIsAuth()) {
      const url = this.route.snapshot.routeConfig.path;
      console.log("url ", url);
      if (url.length === 0) {
        this.router.navigate(["/clips"]);
      }
    }


  }

}
