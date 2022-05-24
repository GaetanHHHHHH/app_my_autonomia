import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActualitesListComponent } from "./actualites-list/actualites-list.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { SingleActualiteComponent } from "./single-actualite/single-actualite.component";

const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'actualites', component: ActualitesListComponent},
    { path: 'actualites/:id', component: SingleActualiteComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}