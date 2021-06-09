function loadDataFromCSV(){
  d3.csv(`data/6-8.csv`).then(function(data) {
    data = typeCorrection(data);
    LORAX = data;
  });
}
function setFeatStates(){
  LORAX.forEach(d => {
    map.setFeatureState({ source: 'source', sourceLayer: 'NY49-dwhx2o', id: d.ElectDist }, {'Total' : d.Total} );
    map.setFeatureState({ source: 'source', sourceLayer: 'NY49-dwhx2o', id: d.ElectDist }, {'Knocked' : d.Knocked} );
    map.setFeatureState({ source: 'source', sourceLayer: 'NY49-dwhx2o', id: d.ElectDist }, {'Percent' : d.Percent} );
  });
}

function typeCorrection(data){
  const keys = Object.keys(data[0]);
  data.forEach(d => {
    keys.forEach(k => {
      if (k != 'ElectDist') d[k] = +d[k]
    });
  });
  return data
}
