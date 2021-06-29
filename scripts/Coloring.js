const colorLayer = () => {
  map.setPaintProperty('d-fills', 'fill-color',
  ['case',
    ['!=', ['feature-state', 'Percent'], null],
    ['interpolate',
      ['linear'],
        ['feature-state', 'Percent'],
        0,    '#FFFFD9',
        0.25, '#DAF1B3',
        0.5,  '#7FCDBB',
        0.75, '#2FA4C2',
        1,    '#225EA8',
    ],
    'rgba(200, 200, 200, 0.7)'
  ]);
}
