import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-actualite',
  templateUrl: './change-actualite.component.html',
  styleUrls: ['./change-actualite.component.scss']
})
export class ChangeActualiteComponent implements OnInit {

  actualiteForm!: FormGroup;
  actualitePreview$!: Observable<Actualite>;
  urlRegex!: RegExp;
  actualiteId = +this.route.snapshot.params['id'];
  actualite$ = this.ActualitesService.getActualiteById(this.actualiteId);

  constructor(private formBuilder: FormBuilder,
    private ActualitesService: ActualitesService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.ActualitesService.getActualiteById(actualiteId).pipe(map(actualite => ({ ...actualite })));
    //console.log(actualiteId)
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    //console.log(this.actualite$)
    this.actualiteForm = this.formBuilder.group({
      id_users: [null],
      titre: [null],
      titre2: [null],
      texte: [null],
      vignette: [null, [Validators.pattern(this.urlRegex)]],
      lien: [null]
    }, {
      updateOn: 'blur'
    });
    this.actualitePreview$ = this.actualiteForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue
      }))
    );
  }

  onSubmitForm(): void {
    const actualiteId = +this.route.snapshot.params['id'];
    this.ActualitesService.changeActualiteById(actualiteId, this.actualiteForm.value).pipe(
      tap(() => this.router.navigateByUrl('/actualites'))
    ).subscribe();
  }

}
