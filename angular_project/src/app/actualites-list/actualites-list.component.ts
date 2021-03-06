import { Component, OnInit } from '@angular/core';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualites-list',
  templateUrl: './actualites-list.component.html',
  styleUrls: ['./actualites-list.component.scss']
})
export class ActualitesListComponent implements OnInit {

  actualites!:Actualite[];
  actualites$!: Observable<Actualite[]>;

  constructor(private actualitesService: ActualitesService) { }

  ngOnInit(): void {
    //this.actualites = this.actualitesService.getAllActualites();
    this.actualites$ = this.actualitesService.getAllActualites();
  }

}
