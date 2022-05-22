import { Component, OnInit } from '@angular/core';
import { Actualite } from './models/actualite.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  actualites!:Actualite[];

  ngOnInit() {
    this.actualites =[
      {
        titre:"Un premier article modifié sur la DB", 
        titre2:"Espérons qu'il s'ajoute correctement!", 
        texte:"De grandes aventures nous attendent encore.", 
        date_publication:new Date(),
        id_users:1,
        vignette:"https://www.autonomia.org/imgcache/b6/19/61/c7/cb/42/5a/ac/a8/57/fc/53/f7/13/03/9a/Validisme-56.webp",
        likes:200,
        lien:"https://www.autonomia.org/projet/validisme"
      },
      {
        titre:"J'ai un copain handicapé, ça change quoi ?", 
        titre2:"Avoir un copain handicapé, ça veut dire quoi ?", 
        texte:"Ça veut dire quoi physiquement, pourquoi il est malade et pas moi ?, Qu'est-ce qui se passe dans son corps ? Et ça veut dire quoi dans la vie de tous les jours ?", 
        date_publication:new Date(),
        id_users:2,
        vignette:"https://www.autonomia.org/imgcache/3a/ad/b3/e9/8e/23/b8/16/07/f4/05/74/fa/ad/2c/38/51H62Q4L1pL._SX409_BO1-204-203-200.webp",
        likes:0
      }
    ];

  }

}
