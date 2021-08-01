import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-format-dialog',
  templateUrl: './change-format-dialog.component.html',
  styleUrls: ['./change-format-dialog.component.css'],
})
export class ChangeFormatDialogComponent implements OnInit {
  decimalPoint: number = 2;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
    this.decimalPoint = this.data;
  }
}
