import { Component, OnInit, OnDestroy } from '@angular/core';
import { Loader } from '@app-models';
import { Subscription } from 'rxjs';
import { SharedService } from '@app-services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  loaderData: Loader;
  loaderSub: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loaderData = new Loader(false);
    this.loaderSub = this.sharedService.setLoader().subscribe((res) => {
      this.loaderData = res;
    });
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }
}
