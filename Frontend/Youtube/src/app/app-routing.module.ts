import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClipCreateComponent } from './clipOldFolder/clips/clip-create/clip-create.component';
import { ClipsListComponent } from './clipOldFolder/clips/clips-list/clips-list.component';
import { ClipSingleComponent } from './clipOldFolder/clips/clip-single/clip-single.component';

const routes: Routes = [
  { path: "", component: ClipsListComponent },
  { path: "clips", component: ClipsListComponent },

  { path: "single", component: ClipSingleComponent },

  { path: "create", component: ClipCreateComponent },
  { path: "edit", component: ClipCreateComponent },

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
