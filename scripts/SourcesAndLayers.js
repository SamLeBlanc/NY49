const addSource = () => {
  map.addSource('source', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.6agltvbn',
    'promoteId': 'ElectDist'
  })
}
const addFillLayer = () => {
  map.addLayer({
    'id': 'd-fills',
    'type': 'fill',
    'source': 'source',
    'source-layer': 'NY49-dwhx2o',
    'layout': {'visibility': 'visible'},
    'paint': {
      'fill-color': 'red',
      'fill-opacity' : .7,
    },
  })
}
const addLineLayer = () => {
  map.addLayer({
    'id': 'd-lines',
    'type': 'line',
    'source': 'source',
    'source-layer': 'NY49-dwhx2o',
    'layout': {'visibility': 'visible'},
    'paint': {
        'line-color': 'black',
        'line-width': 1,
        'line-opacity': 1,
      },
  });
}
const addHighlightLayer = () => {
  map.addLayer({
    'id': 'd-highlight',
    'type': 'line',
    'source': 'source',
    'source-layer': 'NY49-dwhx2o',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': 'yellow',
      'line-width' : [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 5, 0,
      ],
    },
  })
}
