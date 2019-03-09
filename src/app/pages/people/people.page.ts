import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  people: Observable<any>;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.people = this.api.getPeople();
  }

  openDetails(people){
    let split = people.url.split('/');
    let personId = split[split.length-2];
    this.router.navigateByUrl(`/tabs/people/${personId}`);
  }

}
