import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'competitions', component: CompetitionsComponent}
    ]),
    CommonModule,
    BrowserModule
  ],
  declarations: [
    CompetitionsComponent
  ]
})
export class CompetitionModule { }
