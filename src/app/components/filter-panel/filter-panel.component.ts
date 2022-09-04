import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  toggleRegion: boolean = false;
@Output() emitRegion = new EventEmitter<any>();
regionData!: any;
loading : boolean = false;
filterRegion: boolean = false;
filterLabel: string = "Filter by Region"
search: string = '';
  constructor(private http: HttpServiceService) {
  }
  onDropdownClick() {
    this.toggleRegion = !this.toggleRegion
  }
  getAll() {
    this.loading = true;
    this.http.getAll().subscribe((result)=>{
      this.regionData = result;
      this.emitRegion.emit(this.regionData)
      this.loading = false;
      });
  }
  getRegion(name: string){
    this.loading = true;
    if(name == 'default') {
      this.http.getAll().subscribe((result)=>{
        this.regionData = result;
        this.emitRegion.emit(this.regionData)
        this.filterLabel = 'Filter by Region';
        this.loading = false;
        });
    } else {
    this.http.getByRegionName(name).subscribe((data)=> {
      this.regionData = data;
      this.emitRegion.emit(this.regionData)
      this.filterLabel = name;
      console.log(this.regionData)
      this.loading = false;
    })
  }
  }
  ngOnInit(): void {
  }
  onSearchClick(search: string) {
    this.loading = true;
    this.http.getByName(search).subscribe((data)=>{
      this.regionData = data
      this.emitRegion.emit(this.regionData)
      this.loading = false;
    })
    console.log(search)
  }
  clearSearch(search: string) {
    if(search === '') {
      this.getAll();
    }
  }
}
