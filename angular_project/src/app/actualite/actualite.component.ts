import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  @Input() actualite!: Actualite;
  textButton!: string;

  constructor(private actualitesService: ActualitesService, private router: Router) {}

  ngOnInit() {
    this.textButton = "Enregistrer cette actualité"
  }

  // onLike() {
  //   if (this.textButton === 'Enregistrer cette actualité') {
  //     this.actualitesService.likeActualiteById(this.actualite.id, 'like');
  //     this.textButton = 'Ne plus enregistrer cette actualité';
  //   } else {
  //     this.actualitesService.likeActualiteById(this.actualite.id, 'unlike');
  //     this.textButton = 'Enregistrer cette actualité';
  //   }
  // }

  onViewActualite() {
    this.router.navigateByUrl(`actualites/${this.actualite.id}`);
  }


}
