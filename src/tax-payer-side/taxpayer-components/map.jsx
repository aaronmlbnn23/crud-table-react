import React, { useRef, useEffect, useState } from "react";
import { propertyStore } from "../../stores/PropertyStore";
import { useLocation } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import Loader from "../../components/loader";
import Property from "../taxpayer-pages/TP_property";
import { appStore } from "../../stores/AppStore";

const map = ({ applicationData }) => {
  const mapRef = useRef();
  const location = useLocation();
  const selectCoordinate = propertyStore(
    (state) => state.setSelectedCoordinate
  );
  const selectedCoordinate = propertyStore(
    (state) => state.selectedCoordinates
  );
  const application = appStore((state) => state.application);

  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "yzCS8nz2wfQxNWsc8z3bJRombSEC6bNOO0iIa2uZO5w",
    });

    //set Center to current application / set Center to default
    var coordinates;
    var lat;
    var lng;

    if (applicationData && application) {
      coordinates = applicationData.coordinates.split(" ");
      lat = coordinates[0];
      lng = coordinates[1];
    } else {
      lat = 13.8721;
      lng = 121.022;
    }

    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: lat, lng: lng },
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1,
    });

    window.addEventListener("resize", () => hMap.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.
    const tapEvent = (e) => {
      var marker;
      hMap.removeObjects(hMap.getObjects());
      const coord = hMap.screenToGeo(
        e.currentPointer.viewportX,
        e.currentPointer.viewportY
      );
      const lat = Math.abs(coord.lat.toFixed(4));
      const lng = Math.abs(coord.lng.toFixed(4));

      marker = new H.map.Marker({ lat: lat, lng: lng });
      hMap.addObject(marker);
      selectCoordinate(lat.toString() + " " + lng.toString());
    };

    hMap.addEventListener("tap", tapEvent);

    //displays the marker of a current application
    if (applicationData) {
      var marker;
      marker = new H.map.Marker({ lat: lat, lng: lng });
      hMap.addObject(marker);
      hMap.removeEventListener("tap", tapEvent);

      var bubble;
      marker.addEventListener(
        "tap",
        function (evt) {
          bubble = new H.ui.InfoBubble(
            { lat: lat, lng: lng },
            {
              content: `
              <div className='bubble-wrapper'>
              <h3>Property Information</h3>
  
              <p>Tax declaration number: ${applicationData.tdId}</p>
              <p>Owner Name: ${applicationData.name}</p>
              <p>Classification: ${applicationData.classification}</p>
              <p>Address: ${applicationData.address}</p>
              <p>Assessed Value: ${applicationData.assessedValue}</p>
              <p>Status: ${applicationData.status}</p>
  
             
            </div>
  `,
            }
          );
          ui.addBubble(bubble);
        },
        false
      );
      hMap.addObject(marker);
    }

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      //if(location != '/apply-property')
      hMap.dispose();
      //behavior.dispose()
      // ui.dispose()
    };
  }, [mapRef, applicationData]);
  return <div className="map" ref={mapRef} />;
};

export default map;
