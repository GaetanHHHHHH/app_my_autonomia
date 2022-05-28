import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-single-actualite',
  templateUrl: './single-actualite.component.html',
  styleUrls: ['./single-actualite.component.scss']
})
export class SingleActualiteComponent implements OnInit {

  actualite!: Actualite;
  actualite$!: Observable<Actualite>;
  actualites: Actualite[] = [];
  textButton!: string;

  constructor(private actualitesService: ActualitesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.textButton = "Enregistrer cette actualité";
    const actualiteId = +this.route.snapshot.params['id'];
    this.actualite$ = this.actualitesService.getActualiteById(actualiteId);
    // this.fetchActualites();
  }

  // fetchActualites() {
  //   this.actualitesService.getAllActualites().subscribe(
  //     (resp) => { 
  //       console.log(resp)
  //       this.actualites = resp;
  //     }
  //   )
  // }

  onChangeActualite(id: number) {
    this.router.navigateByUrl(`change/${id}`)
    console.log(id)
  }

  // onDeleteActualite(id: number) {
  //   this.actualitesService.deleteActualite(id).subscribe(newData => {
  //       this.actualites = this.actualites.filter(item => item.id !== id);
  //       console.log('Post deleted successfully!')});
  //   this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(
  //     () => this.router.navigate(['actualites']));
  // }

}
