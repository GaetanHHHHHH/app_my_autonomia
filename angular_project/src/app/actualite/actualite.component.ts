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
  actualites: Actualite[] = []

  constructor(private actualitesService: ActualitesService, private router: Router) {}

  ngOnInit() {
    this.textButton = "Enregistrer cette actualité";
    this.fetchActualites();
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

  onDeleteActualite(id:number) {
    this.actualitesService.deleteActualite(this.actualite.id).subscribe(res => {
      this.actualites = this.actualites.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
 })
    
  //   (newData => {
  //     console.log('Post deleted successfully!')});
  // this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(
  //   () => this.router.navigate(['actualites']));
  }

  fetchActualites() {
    this.actualitesService.getAllActualites().subscribe(
      (resp) => { 
        console.log(resp)
        this.actualites = resp;
      }
    )
  }

}
