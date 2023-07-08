import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { AuthModule } from './auth/auth.module';
import { MyTestComponent } from './myTest/myTest/myTest.component';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ClipsListComponent } from './clipOldFolder/clips/clips-list/clips-list.component';
import { ClipCreateComponent } from './clipOldFolder/clips/clip-create/clip-create.component';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteAutoActiveFirstOptionExampleComponent } from './clipOldFolder/Autocomplete-Auto-Active-First-Option-Example/Autocomplete-Auto-Active-First-Option-Example.component';
import { ClipCardComponent } from './clipOldFolder/clips/clip-card/clip-card.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MyTestComponent,
    HeaderComponent,
    ClipsListComponent,
    ClipCreateComponent,
    AutocompleteAutoActiveFirstOptionExampleComponent,
    ClipCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    AuthModule,
    MatToolbarModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,

    ReactiveFormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
