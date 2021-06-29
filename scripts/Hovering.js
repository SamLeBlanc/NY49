let hoveredId = null;
const hoverSetup = () => {
  map.on('mousemove', 'd-fills', e => {
    onHoverStart(e);
    hoveredId = setHoverState(e, hoveredId);
  });
  map.on('mouseleave', 'd-fills', () => {
    onHoverFinish();
    removeHoverState(hoveredId);
  });
}
const startMousefollower = () => {
  $(document).on('mousemove', e => {
    $('#move').css({ left: e.pageX+10,  top: e.pageY+10 });
  });
}
const formatPercent = v => `${Math.round(v*1000)/10}%`
const onHoverFinish = () => {
  $("#move-table").remove();
  map.getCanvas().style.cursor = "";
}
const onHoverStart = e => {
  let district = e.features[0].properties;
  let feature = map.getFeatureState({ source: 'source', sourceLayer: 'NY49-dwhx2o', id: district.ElectDist });
  let arr = [['District', district.ElectDist],
            ['Total Doors', feature['Total']],
            ['Knocked', feature['Knocked']],
            ['Percent', formatPercent(feature['Percent'])]];
  addMoveTable(arr)
  map.getCanvas().style.cursor = "crosshair";
}
const setHoverState = e => {
  if (e.features.length > 0) {
    if (hoveredId) {
      map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: false });
    }
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: true });
  }
  return hoveredId
}
const removeHoverState = () => {
  if (hoveredId) {
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: false });
  }
  hoveredId = null;
}
const addMoveTable = arr => {
  $("#move-table").remove();
  let div = document.getElementById("move")
  let table = document.createElement('TABLE')
  let tableBody = document.createElement('TBODY')
  table.id = 'move-table'
  table.className = 'tableA'
  table.appendChild(tableBody);
  for (i = 0; i < arr.length; i++) {
    let tr = document.createElement('TR');
    if (i==0) tr.style.fontWeight = "900";
    for (j = 0; j < arr[i].length; j++) {
      let td = document.createElement('TD')
      if (i+1==arr.length && j+1==arr[i].length){
        td.style.fontWeight = "900";
        td.style.fontSize = "20px";
      }
      td.width = (90-j*50).toString().concat('px')
      td.appendChild(document.createTextNode(arr[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  div.appendChild(table)
}
