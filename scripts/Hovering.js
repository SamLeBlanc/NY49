let hoveredId = null;

function hoverSetup(){
  map.on('mousemove', 'd-fills', e => {
    onHoverStart(e);
    hoveredId = setHoverState(e, hoveredId);
  });
  map.on('mouseleave', 'd-fills', () => {
    onHoverFinish();
    removeHoverState(hoveredId);
  });
}

$(document).on('mousemove', function(e){
  $('#move').css({
    left:  e.pageX+10,
    top:   e.pageY+10
  });
});

function onHoverStart(e){
  let district = e.features[0].properties;
  let feature = map.getFeatureState({ source: 'source', sourceLayer: 'NY49-dwhx2o', id: district.ElectDist });
  let arr = [['District', district.ElectDist],
            ['Total Doors', feature['Total']],
            ['Knocked', feature['Knocked']],
            ['Percent', formatPercent(feature['Percent'])]];
  addMoveTable(arr)
}

function formatPercent(value){
  return (Math.round(value*1000)/10).toString().concat('%')
}

function onHoverFinish(){
  $("#move-table").remove();
}

function setHoverState(e, hoveredId){
  map.getCanvas().style.cursor = "crosshair";
  if (e.features.length > 0) {
    if (hoveredId) {
      map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: false });
    }
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: true });
  }
  return hoveredId
}

function removeHoverState(hoveredId){
  map.getCanvas().style.cursor = "";
  if (hoveredId) {
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'NY49-dwhx2o'}, { hover: false });
  }
  hoveredId = null;
}

function addMoveTable(arr) {
  $("#move-table").remove();
  let div = document.getElementById("move")
  let table = document.createElement('TABLE')
  let tableBody = document.createElement('TBODY')
  table.id = 'move-table'
  table.className = 'tableA'
  table.appendChild(tableBody);
  for (i = 0; i < arr.length; i++) {
    let tr = document.createElement('TR');
    for (j = 0; j < arr[i].length; j++) {
      let td = document.createElement('TD')
      td.width = (90-j*50).toString().concat('px')
      td.appendChild(document.createTextNode(arr[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  div.appendChild(table)
}
