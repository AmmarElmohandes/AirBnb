import { AfterViewInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'app-googlemap',
  template:'<google-map width="100%" [center]="initialcoordinates" [options]="mapconfigurations"></google-map>',
 changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements AfterViewInit {
 @ViewChild('mapSearchField')
  searchField!: ElementRef;
 @ViewChild(GoogleMap)
  map!: GoogleMap;
  initialcoordinates={ 
  lat:46.533408,
   lng:8.352593};
   mapconfigurations={
     disapleDefaultUI:true,
     fullscreencontrol:true,
     zoomControl:true,
   }

  constructor() { }
  ngAfterViewInit(): void {
    const searchBox=new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement,
    ); 
  searchBox.addListener('places_changed',()=>{
    const places=searchBox.getPlaces();
    if(places.length===0){
      return;
    }
    const bouns=new google.maps.LatLngBounds();
    places.forEach(places=>{
      if(!places.geometry||!places.geometry.location)
      {
        return;
      }
      if(places.geometry.viewport){
        bouns.union(places.geometry.viewport);
      }
      else{
        bouns.extend(places.geometry.location);
      }
    });
    this.map.fitBounds(bouns);
    });
  }

  ngOnInit(): void {
   
  } 

  

}
