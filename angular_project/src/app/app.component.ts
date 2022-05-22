import { Component, OnInit } from '@angular/core';
import { Actualite } from './models/actualite.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  actu!: Actualite;
  actu2!: Actualite;

  ngOnInit() {
    this.actu = new Actualite(
      "Un premier article modifié sur la DB", 
      "Espérons qu'il s'ajoute correctement!", 
      "De grandes aventures nous attendent encore.", 
      new Date(),
      1,
      "https://www.autonomia.org/imgcache/b6/19/61/c7/cb/42/5a/ac/a8/57/fc/53/f7/13/03/9a/Validisme-56.webp",
      0
    );

    this.actu2 = new Actualite(
      "J'ai un copain handicapé, ça change quoi ?", 
      "Avoir un copain handicapé, ça veut dire quoi ?", 
      "Ça veut dire quoi physiquement, pourquoi il est malade et pas moi ?, Qu'est-ce qui se passe dans son corps ? Et ça veut dire quoi dans la vie de tous les jours ?", 
      new Date(),
      2,
      "https://www.autonomia.org/imgcache/3a/ad/b3/e9/8e/23/b8/16/07/f4/05/74/fa/ad/2c/38/51H62Q4L1pL._SX409_BO1-204-203-200.webp",
      0
    );
    
  }

}
