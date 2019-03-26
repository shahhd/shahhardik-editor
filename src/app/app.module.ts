import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AngularFireModule } from 'angularfire2';
import * as firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyBKDWrZyVp02Vg4Tfnxgo1nuBfGsNAceuc",
  authDomain: "hardikshaheditor.firebaseapp.com",
  databaseURL: "https://hardikshaheditor.firebaseio.com",
  projectId: "hardikshaheditor",
  storageBucket: "hardikshaheditor.appspot.com",
  messagingSenderId: "881170536270"

};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AceEditorModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
