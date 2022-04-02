//// LEGENDS

//// Functions for creating the five legends that appear at the top of the map
//// The map allows for viewing multiple layers at a time, so there need be multiple legends too
//// For each of the five layers, we use the functions below to create a legend

// Combo method that creates a legend for of the five layers
const createLegend = () => {
  [[legend,'dem'],
  [legend2,'rep'],
  [legend3,'hispanic'],
  [legend4,'und'],
  [legend5,'share']].forEach(l => {
    legendTitle(l[0],l[1])
    legendBody( l[0],l[1])
  })
}

// Retreives a legend title from the dictionary and adds it to its legend
const legendTitle = (leg,layer) => {
  let label = document.createElement('span');
  label.innerHTML = legendDictionary[layer]['title'];
  let div = document.createElement('div');
  div.className = "legend-title"
  div.appendChild(label);
  leg.appendChild(div);
}

// Creates a legend body (colors and values) from the dictionary and adds it to its legend
const legendBody = (leg,layer) => {
  const text = legendDictionary[layer]['colors'];
  text.forEach(e => {
    let div = document.createElement('div');
    let label_ = createLabel(e[0])
    let square = createSquare(e[1])
    div.appendChild(square);
    div.appendChild(label_);
    leg.appendChild(div);
  });
}

// Creates the colored square (based on the legend dictionary) for each line of the legend body
const createSquare = color => {
  let square = document.createElement('span');
  square.className = 'legend-key';
  square.style.backgroundColor = color;
  return square
}

// Creates the label (based on the legend dictionary) for each line of the legend body
const createLabel = lab => {
  let label = document.createElement('span');
  label.innerHTML = lab;
  return label
}

// Dictionary containing the titles, colors, and values for each of the five legends
const legendDictionary = {
  'dem':{
        'title':'Dem Support',
        'colors':
          [['20%','#f7fbff'],
          ['40%','#c6dbef'],
          ['60%','#4292c6'],
          ['80%','#084594']]
        },
  'rep':{
        'title':'Rep Support',
        'colors':
          [['20%','#fff5f0'],
          ['40%','#fcbba1'],
          ['60%','#ef3b2c'],
          ['80%','#99000d']]
      },
  'und':{
        'title':'Undecided',
        'colors':
          [['0%','#e5f5e0'],
          ['10%','#c7e9c0'],
          ['20%','#a1d99b'],
          ['30%','#74c476']]
        },
  'share':{
        'title':'Vote Share',
        'colors':
          [['0%','#fff5eb'],
          ['10%','#fdd0a2'],
          ['20%','#fd8d3c'],
          ['30%','#d94801']]
        },
  'hispanic':{
        'title':'Hispanic %',
        'colors':
          [['0%','#efedf5'],
          ['30%','#bcbddc'],
          ['60%','#807dba'],
          ['90%','#4a1486']]
        },
}
