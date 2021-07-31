import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import '../../../assets/js/jquery.min.js'
import '../../../assets/bootstrap/js/bootstrap.min.js'
import '../../../assets/js/jquery.easing.min.js'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
