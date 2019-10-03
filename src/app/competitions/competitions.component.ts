import { Competition } from './../models/competition';
import { FootballServiceService } from './../football-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  competitionsTitle = 'Competitions';
  errorMessage = '';
  competitions: Competition[];

  constructor(private footballService: FootballServiceService) { }

  ngOnInit(): void {
    this.footballService.getCompetitions().then(value => {
      value.subscribe({
        next: competitions => {
          this.competitions = competitions;
        },
        error: err => {
          this.errorMessage = err;
          console.log(this.errorMessage);
        }
      });
    });
  }
}
