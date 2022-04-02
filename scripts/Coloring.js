
// Combo method that sets the appearanec of the map
// This gets re-run everytime the settings are changed
const colorMap = () => {
  colorLayers()
  maskLayers()
  hideLayers()
}

// Set the fill color for each of the layers, using the feature states assgined earlier
// This is why feature states are great, we can color the tiles without referencing back to the dataset
// If there is an issue with the feature states, the layer is assigned a default color
// Color scales are assigned linearly, and borrowed from https://observablehq.com/@d3/color-schemes
const colorLayers = () => {
  map.setPaintProperty('dem-fills', 'fill-color',
    ['case',
      ['!=', ['feature-state', 'demsupport'], null],
      ['interpolate',
        ['linear'],
          ['feature-state', 'demsupport'],
          0,    '#f7fbff',
          0.2,    '#f7fbff',
          0.8, '#084594',
          1,    '#084594',
      ],
      'rgba(200, 200, 200, 0.5)'
    ]);
  map.setPaintProperty('rep-fills', 'fill-color',
  ['case',
    ['!=', ['feature-state', 'repsupport'], null],
    ['interpolate',
      ['linear'],
        ['feature-state', 'repsupport'],
        0,    '#fff5f0',
        0.2,    '#fff5f0',
        0.8, '#99000d',
        1,    '#99000d',
    ],
    'rgba(200, 200, 200, 0.5)'
  ]);
  map.setPaintProperty('undecided-fills', 'fill-color',
  ['case',
    ['!=', ['feature-state', 'undecided'], null],
    ['interpolate',
      ['linear'],
        ['feature-state', 'undecided'],
        0,    '#e5f5e0',
        0.2,  '#a1d99b',
        1,    '#a1d99b',
    ],
    'rgba(200, 200, 200, 0.5)'
  ]);
  map.setPaintProperty('hispanic-fills', 'fill-color',
  ['case',
    ['!=', ['feature-state', 'hispanic'], null],
    ['interpolate',
      ['linear'],
        ['feature-state', 'hispanic'],
        0,   '#efedf5',
        0.2, '#dadaeb',
        0.4, '#bcbddc',
        0.6, '#807dba',
        0.8, '#4a1486',
        1,   '#a1d99b',
    ],
    'rgba(200, 200, 200, 0.5)'
  ]);
  map.setPaintProperty('share-fills', 'fill-color',
  ['case',
    ['!=', ['feature-state', 'share'], null],
    ['interpolate',
      ['linear'],
        ['feature-state', 'share'],
        0,    '#fff5eb',
        0.3,  '#d94801',
        1,    '#d94801',
    ],
    'rgba(200, 200, 200, 0.5)'
  ]);
}

// Set the fill opacity for each of the layers, using the feature states assgined earlier
// By default, we use an opacity masks that hides the tiles with the smallest values for that category
// Thus, when viewing Democratic support, the places with the least D support are nearly invisible on the map
// Opacity masks can also be set the use the vote share values on all layers, instead of on its own
// If no opacity mask is picked, the tiles are displayed with opacity 1, and only one layer can be viewed at a time
const maskLayers = () => {
  if ($("input[type='radio']:checked").val() == 'var'){
    map.setPaintProperty('dem-fills', 'fill-opacity',
    ['case',
      ['!=', ['feature-state', 'demsupport'], 0],
      ['interpolate',
        ['linear'],
          ['feature-state', 'demsupport'],
          0,   0.2,
          0.2, 0.2,
          0.8, 0.8,
          1,   0.8,
      ],
      0.5
    ]);
    map.setPaintProperty('rep-fills', 'fill-opacity',
    ['case',
      ['!=', ['feature-state', 'repsupport'], 0],
      ['interpolate',
        ['linear'],
          ['feature-state', 'repsupport'],
          0,   0.2,
          0.2, 0.2,
          0.8, 0.8,
          1,   0.8,
      ],
      0.5
    ]);
    map.setPaintProperty('undecided-fills', 'fill-opacity',
    ['case',
      ['!=', ['feature-state', 'undecided'], 0],
      ['interpolate',
        ['linear'],
          ['feature-state', 'undecided'],
          0,   0,
          0.2, 0.5,
      ],
      0.5
    ]);
    map.setPaintProperty('hispanic-fills', 'fill-opacity',
    ['case',
      ['!=', ['feature-state', 'hispanic'], 0],
      ['interpolate',
        ['linear'],
          ['feature-state', 'hispanic'],
          0,   0,
          0.8, 0.6,
          1, 0.6
      ],
      0.5
    ]);
    map.setPaintProperty('share-fills', 'fill-opacity',
    ['case',
      ['!=', ['feature-state', 'share'], 0],
      ['interpolate',
        ['linear'],
          ['feature-state', 'share'],
          0,   0,
          0.3, 0.6,
      ],
      0.5
    ]);
  } else if ($("input[type='radio']:checked").val() == 'none'){
    ['dem','rep','undecided','hispanic','share'].forEach(d => {
      map.setPaintProperty(`${d}-fills`, 'fill-opacity',1);
    })
  } else if ($("input[type='radio']:checked").val() == 'share'){
    ['dem','rep','undecided','hispanic','share'].forEach(d => {
      map.setPaintProperty(`${d}-fills`, 'fill-opacity',
      ['case',
            ['!=', ['feature-state', 'share'], 0],
            ['interpolate',
              ['linear'],
                ['feature-state', 'share'],
                0,   0,
                0.3, 0.6,
            ],
            0.5
          ]);
    })
  }
}

// Hide the layers that are not checked in the layer select form
// Layers that are hidden are assigned the layout property of invisible, but we do not change the color or opacity
const hideLayers = () => {
  let boxes = ['dem','rep','undecided','hispanic','share']
  boxes.forEach(d => {
    if ($(`#chk-${d}`).is(':checked')){
      map.setLayoutProperty(`${d}-fills`, 'visibility', 'visible')
    } else {
      map.setLayoutProperty(`${d}-fills`, 'visibility', 'none')
    }
  })
}
