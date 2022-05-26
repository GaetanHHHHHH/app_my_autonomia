import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-actualite',
  templateUrl: './single-actualite.component.html',
  styleUrls: ['./single-actualite.component.scss']
})
export class SingleActualiteComponent implements OnInit {

  actualite!: Actualite;
  actualite$!: Observable<Actualite>;
  textButton!: string;

  constructor(private actualitesService: ActualitesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.textButton = "Enregistrer cette actualité";
    const actualiteId = +this.route.snapshot.params['id'];
    this.actualite$ = this.actualitesService.getActualiteById(actualiteId);
  }

  onLike() {
    if (this.textButton === 'Enregistrer cette actualité') {
      this.actualitesService.likeActualiteById(this.actualite.id, 'like');
      this.textButton = 'Ne plus enregistrer cette actualité';
    } else {
      this.actualitesService.likeActualiteById(this.actualite.id, 'unlike');
      this.textButton = 'Enregistrer cette actualité';
    }
  }

}
