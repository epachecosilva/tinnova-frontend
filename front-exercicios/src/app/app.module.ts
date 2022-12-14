import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './component/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import { Exercicio1Component } from './component/exercicio1/exercicio1.component';
import { Exercicio2Component } from './component/exercicio2/exercicio2.component';
import { Exercicio3Component } from './component/exercicio3/exercicio3.component';
import {InputTextModule} from 'primeng/inputtext';
import { Exercicio4Component } from './component/exercicio4/exercicio4.component';
import { Exercicio5Component } from './component/exercicio5/exercicio5.component';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    Exercicio1Component,
    Exercicio2Component,
    Exercicio3Component,
    Exercicio4Component,
    Exercicio5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    CheckboxModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
