import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Actualite } from '../models/actualite.model';

@Component({
  selector: 'app-new-actualite',
  templateUrl: './new-actualite.component.html',
  styleUrls: ['./new-actualite.component.scss']
})
export class NewActualiteComponent implements OnInit {

  actualiteForm!: FormGroup;
  actualitePreview$!: Observable<Actualite>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.actualiteForm = this.formBuilder.group({
      id_users: [null],
      titre: [null],
      titre2: [null],
      texte: [null],
      vignette: [null],
      lien: [null]
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
    console.log(this.actualiteForm.value);
  }

}
