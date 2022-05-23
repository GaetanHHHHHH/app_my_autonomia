import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActualitesListComponent } from "./actualites-list/actualites-list.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const routes: Routes = [
    { path: 'actualites', component: ActualitesListComponent },
    { path: '', component: LandingPageComponent}
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