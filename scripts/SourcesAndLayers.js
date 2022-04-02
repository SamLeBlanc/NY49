//// Functions for adding the vector source and vector layers using basic Mapbox functions
//// There are a total of one vector source, five fill layers, and two line layers

// Add vector tile source (only one since all tiles share the same source)
const addSource = () => {
  map.addSource('source', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.c1zslhp2', // tileset id
    'promoteId': 'id' // important
  })
}

// Add the fill layer (inside the tiles) for each of the tile layers
const addFillLayer = () => {
  const fillLayers = ['dem-fills','rep-fills','undecided-fills','hispanic-fills','share-fills']
  fillLayers.forEach(layer => {
    map.addLayer({
      'id': layer,
      'type': 'fill',
      'source': 'source', // vector tile source from addSource()
      'source-layer': 'catalist-dqt6kw', // tilesource id
      'layout': {'visibility': 'visible'}, // set initial fills to visible
      'paint': {'fill-color': 'transparent'}, // but make the color transparent
    })
  })
}

// Add the lines (border) layer
const addLineLayer = () => {
  map.addLayer({
    'id': 'd-lines',
    'type': 'line',
    'source': 'source', // vector tile source from addSource()
    'source-layer': 'catalist-dqt6kw', // tilesource id
    'layout': {'visibility': 'visible'}, // set lines to visible
    'paint': { 'line-color': '#ddd', 'line-width': 1, 'line-opacity': 1 }, // set line paint here since it won't be changed
  });
}

// Add the highlighting layer (shows a yellow border when tile is hovered over)
const addHighlightLayer = () => {
  map.addLayer({
    'id': 'd-highlight',
    'type': 'line',
    'source': 'source', // vector tile source from addSource()
    'source-layer': 'catalist-dqt6kw', // tilesource id
    'layout': {'visibility': 'visible'}, // set highlights to visible
    'paint': {
      'line-color': 'yellow', // Make the border yellow
      'line-width' : [ 'case', ['boolean', ['feature-state', 'hover'], false], 5, 0], // Only add line width highlight when tile is hovered over
    },
  })
}
