import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rate-component',
  templateUrl: './rate.component.html',
  styles: ``
})
export class RateComponent implements OnInit {

  @Input() rate: number = 0;

  stars: boolean[] = [];
  noStars: boolean[] = [];

  ngOnInit(): void {
    this.stars = Array(this.rate)
    this.noStars = Array(5 - this.rate)
  }

}
