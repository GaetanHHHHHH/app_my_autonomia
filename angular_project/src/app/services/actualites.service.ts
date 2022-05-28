import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actualite } from "../models/actualite.model";
import { map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ActualitesService {

    constructor(private http: HttpClient) {}

    getAllActualites(): Observable<Actualite[]> {
        return this.http.get<Actualite[]>('http://localhost:8080/api/actualites');
    }

    getActualiteById(actualiteId: number): Observable<Actualite> {
        return this.http.get<Actualite>(`http://localhost:8080/api/actualites/${actualiteId}`)
    }

    changeActualiteById(actualiteId: number, formValue: { titre?: string, titre2?: string, texte?: string, date_publication?: Date, 
        id_users?: number, vignette?: string, lien?: string}): Observable<Actualite> {
        return this.getActualiteById(actualiteId).pipe(
            map(actualite => ({
                ...formValue
            })),
            switchMap(updatedActualite => this.http.put<Actualite>(`http://localhost:8080/api/actualites/${actualiteId}`, updatedActualite))
        )
        
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