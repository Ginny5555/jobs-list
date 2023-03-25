<template>
  <div class="map">
    <div class="map-container h-full" ref="myMap"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import maplibre from "maplibre-gl";

export default {
  name: "MyMap",
  mounted: function() {
    const myAPIKey = "513015621f45485896636b02fbb08385";
    const mapStyle =
      "https://maps.geoapify.com/v1/styles/dark-matter-dark-grey/style.json";

    const initialState = {
      lng: -50.248594,
      lat: -4.145098,
      zoom: 4
    };

    const map = new maplibre.Map({
      container: this.$refs.myMap,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    const markerPopup = new maplibre.Popup().setText("Some marker");
    new maplibre.Marker()
      .setLngLat([initialState.lng, initialState.lat])
      .setPopup(markerPopup)
      .addTo(map);
  }
};
</script>
<style>
details.maplibregl-ctrl.maplibregl-ctrl-attrib.mapboxgl-ctrl.mapboxgl-ctrl-attrib.maplibregl-compact.mapboxgl-compact.maplibregl-compact-show.mapboxgl-compact-show {
  display: none !important;
}
</style>
<style scoped>
@import "~maplibre-gl/dist/maplibre-gl.css";
.map {
  height: 218px;
}
</style>
