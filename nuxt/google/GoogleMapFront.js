import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'

import {
  MAP_STYLES_DARK,
  MAP_STYLES_WHITE,
} from './GoogleMapStyles'

export class GoogleMap {
  constructor(selector, pin) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

    // map
    this.map = null
    this.mapContainer = document.querySelector(selector)

    this.mapOptions = {
      // styles: MAP_STYLES_WHITE,
      zoom: 6,
      center: {
        lat: 49.30881846,
        lng: 30.53801849,
      },
      clickableIcons: false, // клик на объекты карты и видеть информацию о них
      // disableDefaultUI: true, // выключить все элементы элементы управления картой
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      scrollwheel: true, // возможность масштабировать карту мышкой или тачпадом
    }

    // markers
    this.markers = []
    this.circle = null

    // cluster
    this.markerCluster = null
    this.bounds = null

    this.pin = pin

    this.directionsService = null
    this.directionsRenderer = null
  }

  initDirections() {
    this.directionsService = new google.maps.DirectionsService()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Подавить рендеринг маркеров.
      // https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
      polylineOptions: {
        strokeColor: 'blue',
        zIndex: 1,
      }
    })

    this.directionsRenderer.setMap(this.map)
  }

  setWaypointsToDirections(waypts) {
    // для отрисовки маршрута, точек на карте должно быть больше 2 и более
    if (waypts.langth < 2) return

    waypts = waypts.map((waypt) => {
      return this.createWaypoint(waypt)
    })

    const request = {
      origin: waypts[0].location, // определяем стартовую точку
      destination: waypts[waypts.length - 1].location, // определяем конечную точку
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    // определяем промежуточные точки
    if (waypts.length > 2) {
      request.waypoints = waypts.splice(1, waypts.length - 2)
    }

    this.directionsService.route(request, (response, status) => {
      if (status === "OK" && response) {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert("Directions request failed due to " + status);
      }
    })
  }

  createWaypoint(marker) {
    const lat = marker.coordinates ? +marker.coordinates.lat : marker.getPosition().lat()
    const lng = marker.coordinates ? +marker.coordinates.lng : marker.getPosition().lng()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint
    return {
      location: new google.maps.LatLng(lat, lng),
      stopover: false,
    }
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          this.initDirections()
          this.circle = this.createCircle()
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}
