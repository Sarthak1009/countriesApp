import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CountryComponent } from './components/country/country.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  title = 'countriesApp';
  countryName!: string;
  regionData!: any;
  @ViewChild('CountryComponent') CountryComponent!: CountryComponent;
  showCountryComp: boolean = false;
  getCountryName(event: string) {
    this.countryName = event;
    this.showCountryComp = true;
    console.log('GettingData', this.countryName);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngDoCheck(): void {
    this.filterByRegion(this.regionData);
  }
  back(value: any) {
    this.showCountryComp = value;
  }
  filterByRegion(data: any) {
    this.regionData = data
  }
}
