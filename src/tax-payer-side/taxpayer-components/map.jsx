import React, { useRef, useEffect, useState } from 'react'
import { propertyStore  } from '../../stores/PropertyStore'
import { useLocation } from 'react-router-dom'

const map = ({ }) => {
  const mapRef = useRef()
  const location = useLocation()
  const selectCoordinate = propertyStore((state) => state.setSelectedCoordinate)


  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;



    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "yzCS8nz2wfQxNWsc8z3bJRombSEC6bNOO0iIa2uZO5w"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 13.8721, lng: 121.0220 },
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener('resize', () => hMap.getViewPort().resize());

   
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);


    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.
    hMap.addEventListener('tap', function (evt) {
      var marker;
      hMap.removeObjects(hMap.getObjects());
      const coord = hMap.screenToGeo(evt.currentPointer.viewportX,
        evt.currentPointer.viewportY);
      const lat = Math.abs(coord.lat.toFixed(4))
      const lng = Math.abs(coord.lng.toFixed(4))

      marker = new H.map.Marker({ lat: lat, lng: lng });
      hMap.addObject(marker);
      selectCoordinate(lat.toString() + ' ' + lng.toString())
    });



    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      if(location != '/apply-property')
      hMap.dispose();
      behavior.dispose()
      ui.dispose()
      
    };
  }, [mapRef]);
  return (<div className="map" ref={mapRef} />);
}

export default map