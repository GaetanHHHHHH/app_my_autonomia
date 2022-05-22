import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {
  titre!: string;
  titre2!: string;
  texte!: string;
  date_publication!: Date;
  id_users!: number;

  ngOnInit() {
    this.titre = "Un premier article modifié sur la DB";
    this.titre2 = "Espérons qu'il s'ajoute correctement!";
    this.texte = "De grandes aventures nous attendent encore.";
    this.date_publication = new Date();
    this.id_users = 1;
  }
}
