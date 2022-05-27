import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actualite } from "../models/actualite.model";
import { map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ActualitesService {

    constructor(private http: HttpClient) {}

    actualites: Actualite[] =[
        // {
        //     id: 1,
        //   titre:"Un premier article modifié sur la DB", 
        //   titre2:"Espérons qu'il s'ajoute correctement!", 
        //   texte:"De grandes aventures nous attendent encore.", 
        //   date_publication:new Date(),
        //   id_users:1,
        //   vignette:"https://www.autonomia.org/imgcache/b6/19/61/c7/cb/42/5a/ac/a8/57/fc/53/f7/13/03/9a/Validisme-56.webp",
        //   likes:200,
        //   lien:"https://www.autonomia.org/projet/validisme"
        // }
      ];


    getAllActualites(): Observable<Actualite[]> {
        return this.http.get<Actualite[]>('http://localhost:8080/api/actualites');
    }

    getActualiteById(actualiteId: number): Observable<Actualite> {
        return this.http.get<Actualite>(`http://localhost:8080/api/actualites/${actualiteId}`)
    }

    likeActualiteById(actualiteId: number, actualiteType: "like" | "unlike"): void {
        // const actualite = this.getActualiteById(actualiteId);
        // actualiteType === "like" ? actualite.likes++ : actualite.likes-- ;
        
    }

    addActualite(formValue: { titre: string, titre2: string, texte: string, date_publication: Date, 
        id_users: number, vignette: string, lien?: string}): Observable<Actualite> {

            return this.getAllActualites().pipe(
                map(actualites => [...actualites].sort((a: Actualite, b: Actualite) => a.id - b.id)),
                map(sortedActualites => sortedActualites[sortedActualites.length - 1]),
                map(previousActualite => ({
                    ...formValue,
                    likes:0,
                    date_publication: new Date(),
                    id: previousActualite.id + 1
                })),
                switchMap(newActualite => this.http.post<Actualite>('http://localhost:8080/api/actualites', newActualite))
            )
        }


}