import { Component, OnInit, Input } from '@angular/core';
import { Actualite } from '../models/actualite.model';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  @Input() actualite!: Actualite;
  textButton!: string;

  ngOnInit() {
    this.textButton = "Enregistrer cette actualité"
  }

  onLike() {
    if (this.textButton === 'Enregistrer cette actualité') {
      this.actualite.likes++;
      this.textButton = 'Ne plus enregistrer cette actualité';
    } else {
      this.actualite.likes--;
      this.textButton = 'Enregistrer cette actualité';
    }
  }


}
