const legendTitle = () => {
  let label = document.createElement('span');
  label.innerHTML = "% Canvassed";
  legend.appendChild(label);
}
const legendBody = () => {
  const text = [['0%','#FFFFD9'],
                ['25%','#DAF1B3'],
                ['50%','#7FCDBB'],
                ['75%','#2FA4C2'],
                ['100%','#225EA8']];
  text.forEach(e => {
    let div = document.createElement('div');
    let label_ = createLabel(e[0])
    let square = createSquare(e[1])
    div.appendChild(square);
    div.appendChild(label_);
    legend.appendChild(div);
  });
}
const createLegend = () => {
  legendTitle()
  legendBody()
}
const createSquare = color => {
  let square = document.createElement('span');
  square.className = 'legend-key';
  square.style.backgroundColor = color;
  return square
}
const createLabel = lab => {
  let label = document.createElement('span');
  label.innerHTML = lab;
  return label
}
