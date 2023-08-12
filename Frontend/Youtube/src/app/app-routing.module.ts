import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClipCreateComponent } from './clips/clip-create/clip-create.component';
import { ClipsListComponent } from './clips/clips-list/clips-list.component';
import { ClipSingleComponent } from './clips/clip-single/clip-single.component';
import { InfoPageComponent } from './info-page/info-page.component';

const routes: Routes = [

  { path: "", component: InfoPageComponent },
  { path: "clips", component: ClipsListComponent /*, canActivate: [AuthGuard] */ },

  { path: "single", component: ClipSingleComponent /*, canActivate: [AuthGuard] */ },

  { path: "create", component: ClipCreateComponent /*, canActivate: [AuthGuard] */ },



  // //  { path: "edit", component: ClipCreateComponent },

  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // { path: '404', },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
