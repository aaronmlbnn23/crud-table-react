import React, { useRef, useEffect, useState } from "react";
import { propertyStore } from "../stores/PropertyStore";
import { userStore } from "../stores/UserStore";

const AdminMap = () => {
  const mapRef = useRef();
  const fetchGeomap = propertyStore((state) => state.fetchGeomap)
  const user = userStore((state) => state.user)
  const getUser = userStore((state) => state.getUser)
  const geomapCoordinates = propertyStore((state) => state.geomapCoordinates)
  const setDataPoints = propertyStore((state) => state.setDataPoints)
  const dataPoints = propertyStore((state) => state.dataPoints)
  useEffect(() => {
    const getGeomap = async () => {
      getUser()
      await fetchGeomap(user.token);

    };
    getGeomap();
  }, []);

  useEffect(() => {
    setDataPoints(geomapCoordinates)
  }, [geomapCoordinates])


  console.log(dataPoints)


  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    const startClustering = async (map, data) => {
      var d = data.map(function (item) {
        return new H.clustering.DataPoint(item.lat, item.lng);
      });
      // Create a clustering provider with custom options for clusterizing the input
      var clusteredDataProvider = new H.clustering.Provider(d, {
        clusteringOptions: {
          // Maximum radius of the neighbourhood
          eps: 32,
          // minimum weight of points required to form a cluster
          minWeight: 2
        }
      });

      // Create a layer tha will consume objects from our clustering provider
      var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

      // To make objects from clustering provder visible,
      // we need to add our layer to the map
      hMap.addLayer(clusteringLayer);

    }


    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "yzCS8nz2wfQxNWsc8z3bJRombSEC6bNOO0iIa2uZO5w",
    });

    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 13.8721, lng: 121.022 },
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1,
    });

    window.addEventListener("resize", () => hMap.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);



    startClustering(hMap, dataPoints)


    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      //if(location != '/apply-property')
      hMap.dispose();
      //behavior.dispose()
      // ui.dispose()
    };
  }, [mapRef, dataPoints]);
  return <div className="map" ref={mapRef} />;
};

export default AdminMap;
