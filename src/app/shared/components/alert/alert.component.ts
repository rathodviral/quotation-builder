import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '@app-services';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: Alert;
  alertSub: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.alertSub = this.sharedService.setAlert().subscribe((res) => {
      this.alert = res;
      setTimeout(() => {
        this.alert.isShow = false;
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
