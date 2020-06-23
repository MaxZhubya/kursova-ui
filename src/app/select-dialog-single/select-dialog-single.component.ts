import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SelectData} from '../model/select-data';

@Component({
  selector: 'app-select-dialog-single',
  templateUrl: './select-dialog-single.component.html',
  styleUrls: ['./select-dialog-single.component.css']
})
export class SelectDialogSingleComponent implements OnInit {

  selectedValues: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectDialogSingleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { "selectedDataList": SelectData[], "isMultiple": boolean, "title": string }) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectEvent(event) {
    console.log('Dialog select event value: ' + event.value);
    if (event.value instanceof Array)
      this.selectedValues = event.value;
    else
      this.selectedValues.push(event.value);
  }

}
