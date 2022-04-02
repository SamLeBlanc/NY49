let hoveredId = null;
const hoverSetup = () => {
  map.on('mousemove', 'dem-fills', e => {
    onHoverStart(e);
    hoveredId = setHoverState(e, hoveredId);
  });
  map.on('mouseleave', 'dem-fills', () => {
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
  let feature = map.getFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: district.id });

  chked = $("#tooltip-select input[type='checkbox']:checked")
  chked_ = []
  for (i=0; i<chked.length; i++){
    chked_.push(chked[i]['value'])
  }

  let arr = []
  if (chked_.includes('name')) arr.push(['Name', feature.name])
  if (chked_.includes('dem')) arr.push(['Dem Support', feature.demsupport])
  if (chked_.includes('margin')) arr.push(['Dem Margin', feature.demsupport - feature.repsupport])
  if (chked_.includes('target')) arr.push(['Dem Target', 100*(feature.share*feature.undecided)*(feature.demsupport - feature.repsupport)])
  if (chked_.includes('rep')) arr.push(['Rep Support', feature.repsupport])
  if (chked_.includes('und')) arr.push(['Undecided', feature.undecided])
  if (chked_.includes('hisp')) arr.push(['Hispanic%', feature.hispanic])
  if (chked_.includes('share')) arr.push(['Vote Share', feature.share])

  arr = arr.map(a => {
    try {
      return [a[0],a[1].toFixed(3)]
    } catch {
      return a
    }
  })
  addMoveTable(arr)
  map.getCanvas().style.cursor = "crosshair";
}
const setHoverState = e => {
  if (e.features.length > 0) {
    if (hoveredId) {
      map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'catalist-dqt6kw'}, { hover: false });
    }
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'catalist-dqt6kw'}, { hover: true });
  }
  return hoveredId
}
const removeHoverState = () => {
  if (hoveredId) {
    map.setFeatureState({ source: 'source', id: hoveredId, sourceLayer:'catalist-dqt6kw'}, { hover: false });
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
      td.width = (100+j*20).toString().concat('px')
      td.appendChild(document.createTextNode(arr[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  div.appendChild(table)
}
