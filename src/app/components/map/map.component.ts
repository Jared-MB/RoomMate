import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';

interface Marker {
  position: google.maps.LatLngLiteral;
  label: MapMarker['label'];
  id: string
}

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() id = ''

  constructor(
    private readonly router: Router
  ) { }

  @Input() clickable = true
  @Input() defaultLabel = 'Ubicación'
  @Input() coords: { lat: number, lng: number, id: string }[] | null = null
  @Input() centerOn: { lat: number, lng: number } | null = null
  @Input() single = true
  @Input() navigateOnClick = false
  @Input() nearby = '5'
  @Input() calculateNearby = false

  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  @Output() locationsCalculated = new EventEmitter<{ lat: number, lng: number, id: string }[]>();

  center: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };
  zoom = 15;
  markers: Marker[] = [];

  ngOnInit() {
    this.getUserLocation(!this.centerOn);
    if (this.centerOn) {
      this.center = this.centerOn
      this.markers = [{
        position: this.centerOn,
        id: 'center',
        label: {
          fontWeight: 'bold',
          color: '#333',
          fontSize: '1.2rem',
          text: 'Ubicación',
        } satisfies MapMarker['label']
      }]
      if (this.coords) {
        this.markers = this.coords.map(coord => ({
          position: coord,
          id: coord.id,
          label: {
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1.2rem',
            text: this.defaultLabel,
          } satisfies MapMarker['label']
        })).concat([{
          position: {
            ...this.centerOn,
            id: 'center',
          },
          id: 'center',
          label: {
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1.2rem',
            text: 'Ubicación',
          } satisfies MapMarker['label']
        }])
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['centerOn'] && this.centerOn) {
      this.center = this.centerOn
      this.markers = this.markers.filter(marker => marker.id !== 'center').concat([{
        position: this.centerOn,
        id: 'center',
        label: {
          fontWeight: 'bold',
          color: '#333',
          fontSize: '1.2rem',
          text: 'Ubicación',
        } satisfies MapMarker['label']
      }])
      console.log('centerOn')
      // this.markers = [{
      //   position: this.centerOn,
      //   id: 'center',
      //   label: {
      // fontWeight: 'bold',
      //     color: '#333',
      // fontSize: '1.2rem',
      //     text: 'Ubicación',
      //   } satisfies MapMarker['label']
      // }]
    }
    if ((changes['coords'] && this.coords) || (changes['nearby'] && this.coords)) {
      this.markers = this.coords!.map(coord => ({
        position: coord,
        id: coord.id,
        label: {
          fontWeight: 'bold',
          color: '#333',
          fontSize: '1.2rem',
          text: this.defaultLabel,
        } satisfies MapMarker['label']
      }))
      this.calculateNearby && this.filterNearbyLocations(+this.nearby);
      console.log('coords', this.coords)
    }
  }

  onMarkerClick(marker: Marker) {
    this.navigateOnClick && this.router.navigate([marker.id])
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (!this.clickable) {
      return;
    }
    if (event.latLng) {
      const newMarker: Marker = {
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        id: 'new-marker-' + Math.random().toString(36).substr(2, 9),
        label: {
          fontWeight: 'bold',
          color: '#333',
          fontSize: '1.2rem',
          text: this.defaultLabel,
        } satisfies MapMarker['label']
      }
      if (this.single) {
        this.markers = [newMarker];
      }
      else {
        this.markers.push(newMarker);
      }
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

  clearMarkers() {
    this.markers = [];
  }

  getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km
    return distance;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  filterNearbyLocations(maxDistanceKm: number) {
    if (this.center) {
      this.markers = this.markers.filter(marker => {
        const distance = this.getDistance(
          this.center!.lat,
          this.center!.lng,
          marker.position.lat,
          marker.position.lng
        );
        return distance <= maxDistanceKm;
      });
      this.locationsCalculated.emit(this.markers.map(marker => ({ lat: marker.position.lat, lng: marker.position.lng, id: marker.id })))
    }
  }
}