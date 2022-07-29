import React, { useRef, useEffect, useState } from "react";
import { propertyStore } from "../stores/PropertyStore";
import { userStore } from "../stores/UserStore";

const AdminMap = ({ token }) => {
  const mapRef = useRef();
  const propertyData = propertyStore((state) => state.propertyData)

  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;


    /** 
    const startClustering = async (map, data) => {
      var d = data.map(function (item) {
        return new H.clustering.DataPoint(item.lat, item.lng);
      });
      // Create a clustering provider with custom options for clusterizing the input
      var clusteredDataProvider = new H.clustering.Provider(d, {
        clusteringOptions: {
          // Maximum radius of the neighbourhood
          eps: 64,
          // minimum weight of points required to form a cluster
          minWeight: 3
        },

      });

      // Create a layer tha will consume objects from our clustering provider
      var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);


      clusteredDataProvider.addEventListener('tap', onMarkerClick);

      // To make objects from clustering provder visible,
      // we need to add our layer to the map
      map.addLayer(clusteringLayer);
 
    }
*/
    function addMarkerToGroup(group, coordinate, html) {

      var svgMarkup = '<svg stroke="${STROKE}" fill="${FILL}" stroke-width="2px" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>'
      var cubsIcon = new H.map.Icon(
        svgMarkup.replace('${FILL}', 'green').replace('${STROKE}', 'green')),
        marker = new H.map.Marker(coordinate,
          { icon: cubsIcon });
 

      // var marker = new H.map.Marker(coordinate);
      // add custom data to the marker
      marker.setData(html);
      group.addObject(marker);
    }



    function addInfoBubble(map) {
      var group = new H.map.Group();

      map.addObject(group);

      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData()
        });
        // show info bubble
        ui.addBubble(bubble);
      }, false);


      propertyData.map((data) => {
        const lat = data.coordinates.split(', ')[0]
        const lng = data.coordinates.split(', ')[1]
        addMarkerToGroup(group, { lat: lat, lng: lng },
          `
      <h3>Property Information</h3>
      <div class="propertyName">Tax Declaration Number: ${data.tdId}</div>
      <div class="propertyName">Owner name: ${data.name}</div>

      `)
      })
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


    addInfoBubble(hMap);







    /** 

    const onMarkerClick = async (e) => {
      // Get position of the "clicked" marker
      var position = e.target.getGeometry(),
        // Get the data associated with that marker
        data =  await e.target.getData(),
        // Merge default template with the data and get HTML
        bubbleContent = getBubbleContent(data),
        bubble = onMarkerClick.bubble;

        const lat = Math.abs(data.c.lat.toFixed(4));
        const lng = Math.abs(data.c.lng.toFixed(4));
        setLocation(lat.toString() + ', ' + lng.toString())
         console.log(location)
        //getDatapointsInfo(token, location)
      // For all markers create only one bubble, if not created yet
      if (!bubble) {
        bubble = new H.ui.InfoBubble(position, {
          content: bubbleContent
        });
        ui.addBubble(bubble);
        // Cache the bubble object
        onMarkerClick.bubble = bubble;
      } else {
        // Reuse existing bubble object
        bubble.setPosition(position);
        bubble.setContent(bubbleContent);
        bubble.open();
      }

    }

    function getBubbleContent(data) {
      return `<div className='asdasdasd'>${location}</div>`
    }
    
    
    startClustering(hMap, dataPoints)
*/

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      //if(location != '/apply-property')
      hMap.dispose();
      //behavior.dispose()
      // ui.dispose()
    };
  }, [mapRef, propertyData]);
  return <div className="map" ref={mapRef} />;
};

export default AdminMap;
