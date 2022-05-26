import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Actualite } from '../models/actualite.model';
import { ActualitesService } from '../services/actualites.service';

@Component({
  selector: 'app-new-actualite',
  templateUrl: './new-actualite.component.html',
  styleUrls: ['./new-actualite.component.scss']
})
export class NewActualiteComponent implements OnInit {

  actualiteForm!: FormGroup;
  actualitePreview$!: Observable<Actualite>;
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private ActualitesService: ActualitesService,
              private router: Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.actualiteForm = this.formBuilder.group({
      id_users: [null, Validators.required],
      titre: [null, Validators.required],
      titre2: [null, Validators.required],
      texte: [null, Validators.required],
      vignette: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      lien: [null]
    }, {
      updateOn: 'blur'
    });
    this.actualitePreview$ = this. actualiteForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        date_publication: new Date(),
        id: 0,
        likes: 0
      }))
    );
  }

  onSubmitForm(): void {
    this.ActualitesService.addActualite(this.actualiteForm.value);
    this.router.navigateByUrl('/actualites');
  }

}
