import { Component, Input,  OnInit } from '@angular/core';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css'],
  providers: []
})
export class LocationsListComponent implements OnInit {
  @Input() childLocations;
  constructor() { }

  ngOnInit() {
  }

}
