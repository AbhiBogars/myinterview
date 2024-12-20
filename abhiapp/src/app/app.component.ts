import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  projectList: any[] = [];
  isPopupOpen = false;
  form: FormGroup;
  editIndex: number | null = null;
  term: string = '';
  editFlag: boolean = false;
  AllData: any;
  title: any;
  searchtext: any;
  selectedOrder: string = 'asc';

  constructor(private fb: FormBuilder, private https: HttpClient) {
    this.form = this.fb.group({
      project: ['', Validators.required],
      task: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });
    this.getAll();
  }

  openPopup() {
    this.isPopupOpen = true;
    this.form.reset();
    this.editIndex = null;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.form.reset();
  }

  save() {
    if (this.form.valid) {
      const det = this.form.value;
      this.https.post('http://localhost:8080/api/tasks', det).subscribe(
        (date: any) => {},
        () => {},
        () => {
          this.getAll();
          this.editFlag = false;
          this.closePopup();
        }
      );
    }
  }
  onEdit() {
    const det = this.form.value;
    this.https
      .put(`http://localhost:8080/api/tasks/${this.editIndex}`, det)
      .subscribe(
        (date: any) => {},
        () => {},
        () => {
          this.getAll();
          this.closePopup();
          this.editFlag = false;
        }
      );
  }

  edit(index: number, x: any) {
    this.openPopup();
    this.editIndex = x?.id;
    this.editFlag = true;
    this.form.patchValue(this.projectList[index]);
  }

  delete(x: any) {
    this.https.delete(`http://localhost:8080/api/tasks/${x?.id}`).subscribe(
      (date: any) => {},
      () => {},
      () => {
        this.getAll();
      }
    );
  }
  getAll() {
    this.https.get(`http://localhost:8080/api/tasks`).subscribe((date: any) => {
      this.projectList = date;
      this.AllData = date;
      this.editFlag = false;
    });
  }
  Ascen() {
    this.projectList?.sort((a: any, b: any) => {
      return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
    });
  }

  Descn() {
    this.projectList?.sort((a: any, b: any) => {
      return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
    });



  }
  
  onSortChange(event: any): void {
    const value = event.target.value;
    if (value === 'asc') {
      this.Ascen();
    } else if (value === 'desc') {
      this.Descn();
}
}
}
