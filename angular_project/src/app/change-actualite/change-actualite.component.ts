import { Component, OnInit, Input } from '@angular/core';
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
  //@Input() actualite!: Actualite;
  actualiteForm!: FormGroup;
  actualitePreview$!: Observable<Actualite>;
  actualite$!: Observable<Actualite>;
  urlRegex!: RegExp;
  formFieldData: any;
  
  //actualite$ = this.ActualitesService.getActualiteById(this.actualiteId);

  constructor(private formBuilder: FormBuilder,
    private ActualitesService: ActualitesService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const actualiteId = +this.route.snapshot.params['id'];
    console.log(actualiteId);
    this.actualite$ = this.ActualitesService.getActualiteById(actualiteId);


    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    // this.ActualitesService.getActualiteById(actualiteId).subscribe((res:any)=>{
    // this.formFieldData=res["data"] //to capture the data values to be pre-filled in my form from the backend
    // console.log(this.formFieldData[0])
    // })
    //this.actualiteForm.get("id_users")?.setValue(this.actualite.id_users);
    //this.actualiteForm.get("titre")?.setValue(this.actualite.titre);
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
