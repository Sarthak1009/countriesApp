import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
@Input() countryDetails!: any;
loading: boolean = false;
regionDetails!: any;
  countries!: any;
  number: number = 12
  isDataLoaded: boolean = false;
  @Output() countryName = new EventEmitter<string>();
  constructor(private http: HttpServiceService) {
    this.loading = true;
    this.http.getAll().subscribe((result)=>{
    this.countryDetails = result;
    this.loading = false
    console.log(this.countryDetails)
    });
}
ngOnChanges(changes: SimpleChanges): void {
}
ngAfterViewInit(): void {
  this.isDataLoaded = true;
}
  onLoadMore() {
    this.number+= 16;
  }
  onCountryClick(i: number) {
    this.countryName.emit(this.countryDetails[i].name.common);
    // console.log("Emit",this.countryDetails[i].name.common);
  }
  filterByRegion(data: any) {
    this.countryDetails = data
  }
  ngOnInit(): void {
  }
}
