import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import * as Firepad from 'firepad';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
//import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('firepad') firepadEle: AceEditorComponent;

  public title: string = 'collaborative editor';
  public userdata: Array<UserModel> ;
  private users: any;
  constructor(@Inject(FirebaseApp) firebaseApp: any) { }

  public ngOnInit() {
    let self = this;
    // // Get Firebase Database reference.
    let firepadRef = firebase.database().ref();

    // // Create Ace editor.
    let editor = this.firepadEle.getEditor();//.edit('firepad');
    editor.setOption("showPrintMargin", false)

    // // Create Firepad.
    let firepad = Firepad.fromACE(firepadRef, editor);

    //Get all active user
    this.users = firebase.database().ref('/users');
    this.users.on('value', function (snapshot) {
      // this.setUser(snapshot.val());
      let values = snapshot.val();
      self.userdata = new Array<UserModel>();
      for (let x in values) {
        let usermdl = new UserModel();
        usermdl.userName = x;
        usermdl.color = values[x].color;
        self.userdata.push(usermdl);
      }
   
    });

    // let firepadUserList = <any>FirepadUserList.fromDiv(firepadRef.child('users'),
    //      document.getElementById('userlist'), userId);
    //// Initialize contents.
    firepad.on('ready', function () {
        (<any>document.getElementsByClassName('powered-by-firepad')[0]).style.visibility = 'hidden';
      if (firepad.isHistoryEmpty()) {
        firepad.setText('Check out the user list to the left!');
      }
    });
  }


}
class UserModel {
  userName: string = '';
  color: string = '';
}