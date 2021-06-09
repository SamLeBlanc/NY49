function colorLayer(){
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

function createLegend(){
  const text = [['0%','#FFFFD9'],
                ['25%','#DAF1B3'],
                ['50%','#7FCDBB'],
                ['75%','#2FA4C2'],
                ['100%','#225EA8']]
  text.forEach(e => {
    let div = document.createElement('div');
    let label = createLabel(e[0])
    let square = createSquare(e[1])
    div.appendChild(square);
    div.appendChild(label);
    legend.appendChild(div);
  });
}

function createSquare(col){
  let square = document.createElement('span');
  square.className = 'legend-key';
  square.style.backgroundColor = col;
  return square
}

function createLabel(lab){
  let label = document.createElement('span');
  label.innerHTML = lab;
  return label
}
