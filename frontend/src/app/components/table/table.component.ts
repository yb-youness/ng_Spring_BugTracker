import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';
import { Bug } from '../../Models/Bug';
//! Router For Redirection
import { Router } from '@angular/router';
//! Spinner Comp ==> ng add ngx-bootstrap-spinner
// https://www.npmjs.com/package/ngx-bootstrap-spinner
// Confirm Window up
// https://stackblitz.com/edit/angular-confirmation-dialog?file=app%2Fconfirmation-dialog%2Fconfirmation-dialog.component.html
let BUGS: Bug[] = [];

@Component({
  selector: 'app-TableComponent',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  page = 1;
  pageSize = 4;

  Bugs: Bug[] = [];
  collectionSize = 0;
  Submited = false;
  loaded = false;
  closeResult = '';
  isEdit = false;
  // This is To Refrence The Form Inputs And Delete + Edit
  // The Seleted Bug
  curentbug: Bug = {
    id: 0,
    bugName: '',
    bug_Ocurance: null,
    user_Name: '',
  };
  @(ViewChild('bugForm')!) form: any;

  //! Inject The  Model Service + The Flash msgs
  constructor(
    private modalService: NgbModal,
    private _flashMessagesService: FlashMessagesService,
    private Service: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetAllBugs();
  }
  //! This For The poup Model Actions (Add /Edit )
  //! Refactor To It Own Function
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.formReset();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //! Reset Form Here
          this.formReset();
          this.closeResult = `Dismissed `;
        }
      );
  }

  opendelModel(content: any, bug: Bug) {
    this.curentbug = bug; // Thsi To Bind The Bug To Delete
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.formReset();
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //! Reset Form Here
          this.formReset();
          this.closeResult = `Dismissed `;
        }
      );
  }

  //! This For The Search
  refreshbugs() {
    this.Bugs = BUGS.map((Bug, i) => ({
      id: i + 1,
      ...Bug,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  //! This For binding Data
  bind(bug: Bug, content: any): void {
    this.curentbug = bug;
    this.isEdit = true;
    //! Call The Open Model Funtion
    this.open(content);
  }
  //! On submit
  onSubmit({ value, valid }: NgForm): void {
    this.Submited = true;
    let msg = 'Bug Added Whith Success !';
    if (valid) {
      //! the form is Valid call the Service
      //! If Edit Is Set Call the Edit Form
      if (!this.isEdit) {
        // Call The Add Service
        this.Service.AddBug(this.curentbug).subscribe(() => this.GetAllBugs());
      } else {
        // Call The Rest Service + Add The msg + reset The Edit Value
        this.Service.EditBug(this.curentbug).subscribe(() => this.GetAllBugs());
        msg = 'Bug Updated Whith Success !';

        this.isEdit = false;
      }
      // Clear The Form Option is Not Required

      //!  Add Flash Msg
      // op 1   https://www.npmjs.com/package/angular2-flash-messages
      // op 2  https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
      // op 3  toster https://blog.jscrambler.com/how-to-create-angular-toastr-notifications
      // Op 1

      this._flashMessagesService.show(msg, {
        cssClass: 'mt-3 alert alert-success alert-dismissible fade show',
        timeout: 3000,
      });

      this.formReset();
      this.Submited = false;
      // Close The Model
      this.modalService.dismissAll();

      // Redirect
      // this.router.navigate(['/']);
    }
  }
  //! Get All Bugs
  GetAllBugs(): void {
    setTimeout(() => {
      this.Service.getBugs().subscribe((bgs) => {
        this.collectionSize = bgs.length;
        BUGS = bgs;
        this.refreshbugs();
        this.loaded = true;
      });
    }, 2000);
  }

  //! This Function Is To Delete Bug
  onDelete() {
    console.log('Delete Function Is Called !!' + this.curentbug.id);
    this.Service.DeletBug(this.curentbug.id).subscribe(() => {
      this.GetAllBugs();
    });
    this.formReset(); // Set The Slected Item
    this.modalService.dismissAll();
    this._flashMessagesService.show('Bug Deleted Whith Success !', {
      cssClass: 'mt-3 alert alert-success alert-dismissible fade show',
      timeout: 3000,
    });
  }

  //! This Func Is To Reset The Form

  formReset(): void {
    this.curentbug = {
      id: 0,
      bugName: '',
      bug_Ocurance: null,
      user_Name: '',
    };
  }
}
