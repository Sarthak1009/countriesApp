import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnChanges {
  @Input() selectedCountry: string = '';
  borderCountryDetails!: Object;
  urlMaps!: string;
  data!: any;
  nativeName!: string;
  currencies!: string;
  languages!: any;
  borderRes!: any;
  borderName: string[] = [];
  googleMapsUrl!: any;
  mapUrlLoaded: boolean = false;
  loading: boolean = false;
  constructor(
    private http: HttpServiceService,
    private sanitizer: DomSanitizer
  ) {}
  cSubscribe: any;
  @Output() backClick = new EventEmitter<boolean>();
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.onClick();
  }
  onClick() {
    this.loading = true;
    this.cSubscribe = this.http
      .getByName(this.selectedCountry)
      .subscribe((result) => {
        this.data = result;
        this.nativeName =
          this.data[0].name.nativeName[
            Object.keys(this.data[0].name.nativeName)[0]
          ].common;
        this.currencies =
          this.data[0].currencies[Object.keys(this.data[0].currencies)[0]].name;
        this.languages = Object.values(this.data[0].languages);
        console.log('SelectedCountry', this.data);
        this.urlMaps = this.data[0].maps.openStreetMaps;
        this.getBorderCountries();
        this.GoogleMapsURLToEmbedURL();
        console.log('GoogleUrl', this.googleMapsUrl);
        this.loading = false;
      });
  }
  onBackClick() {
    this.cSubscribe.unsubscribe();
    this.backClick.emit(false);
  }
  getBorderCountries() {
    this.loading = true;
    if(this.data[0].borders) {
      let border: string[] = Object.values(this.data[0].borders);
    for (let i = 0; i < border.length; i++) {
      this.http.getByCodeName(border[i]).subscribe((res) => {
        this.borderRes = res;
        this.borderName.push(this.borderRes[0].name.common);
        this.loading = false;
      });
    }
  }
  }
  onCountryClick(value: string) {
    this.selectedCountry = value;
    this.onClick();
  }
  GoogleMapsURLToEmbedURL() {
    let coord1 = this.data[0].latlng[1];
    let coord0 = this.data[0].latlng[0];
    let multiplyer = 15000000;
    let url =
      'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d' +
      multiplyer +
      '!2d' +
      coord1 +
      '!3d' +
      coord0 +
      '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098';
    this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.mapUrlLoaded = true;
  }
}
