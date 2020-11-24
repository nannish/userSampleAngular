import { Component, Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { UserService } from 'src/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userSample';
  alive = true;
  constructor(public fb: FormBuilder,private service:UserService) { 
  this.InitUserForm(null);
  }

  public newUserForm: FormGroup;
  users: any;

 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }
  InitUserForm(user) {
    this.newUserForm = this.fb.group({
      userId: user ? user.userId : 0,
      firstName: [user ? user.firstName : null, Validators.compose([Validators.required])],
      lastName: [user ? user.lastName : null, Validators.compose([Validators.required])],
      city: [user ? user.city : null, Validators.compose([Validators.required])],
      phone: [user ? user.phone : null,Validators.compose([Validators.required])]
    });
  }
  cancelUser() { 
    this.InitUserForm(null);
  }
  deleteUser(user) { 
    this.service.DeleteUser(user.userId).pipe(takeWhile(() => this.alive)).subscribe(( ) => {
        this.getUsers();
      });
  }
  edituser(user) { 
    this.InitUserForm(user);
  }
  saveUser(user) {
    if (user.userId > 0) {
      this.service.EditUser(user).pipe(takeWhile(() => this.alive)).subscribe(( ) => {
       
        this.InitUserForm(null);
        this.getUsers();
      });
    } else {
      this.service.AddUser(user).pipe(takeWhile(() => this.alive)).subscribe(( ) => {
 
        this.InitUserForm(null);
        this.getUsers();
      });
    }
  }
  getUsers() { 
     this.service.GetAllUsers().pipe(takeWhile(() => this.alive)).subscribe((data: []) => {
      this.users = data;
    });
  }
}


export type SortColumn = keyof  '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn ;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}