import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Marker {
  position: google.maps.LatLngLiteral;
  label: { color: string, text: string };
}

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() coords: { lat: number, lng: number } | null = null

  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();

  center: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };
  zoom = 15;
  markers: Marker[] = [];

  ngOnInit() {
    this.getUserLocation(!this.coords);
    if (this.coords) {
      this.center = this.coords
      this.markers = [{
        position: this.coords,
        label: {
          color: 'black',
          text: 'Ubicación'
        }
      }]
    }
  }

  onMarkerClick(marker: Marker) {
    alert(`Hiciste clic en el marcador: ${marker.label.text}`);
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const newMarker: Marker = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        label: {
          color: 'black',
          text: 'Ubicación'
        }
      };
      this.markers = [newMarker];
      this.locationSelected.emit(newMarker.position);
    }
  }

  getUserLocation(center = true) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          if (center) {
            this.center = userLocation;
          }
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }
}