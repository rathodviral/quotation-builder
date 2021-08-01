import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';

import {
  LoaderComponent,
  AlertComponent,
  PageNotFoundComponent,
  DynamicFormControlComponent,
  AddRemoveColumnDialogComponent,
  ChangeFormatDialogComponent,
  ConfirmationDialogComponent,
} from '@app-components';
import { TotalAmountPipe } from '@app-pipes';

const sharedModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
];

const sharedDirectives = [];

const entryComponents = [];

const sharedPipes = [TotalAmountPipe];

const sharedComponents = [
  LoaderComponent,
  AlertComponent,
  PageNotFoundComponent,
  DynamicFormControlComponent,
  AddRemoveColumnDialogComponent,
  ChangeFormatDialogComponent,
  ConfirmationDialogComponent,
];

const sharedServices = [];

@NgModule({
  imports: [...sharedModule],
  declarations: [...sharedDirectives, ...sharedComponents, ...sharedPipes, ...entryComponents, ConfirmationDialogComponent],
  providers: [...sharedServices],
  exports: [...sharedModule, ...sharedDirectives, ...sharedComponents, ...sharedPipes],
  entryComponents: [...entryComponents],
})
export class SharedModule {}
