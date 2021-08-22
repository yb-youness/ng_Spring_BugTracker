import { Component, OnInit } from '@angular/core';
import { faBug, faHome, faQuestion } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  bugIcone = faBug;
  homeIcone = faHome;
  aboutIcone = faQuestion;
  constructor() {}

  ngOnInit(): void {}
}
