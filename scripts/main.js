function main(){
  map.fitBounds([[-74.206638,40.599356],[-74.051800,40.649127]]);
  addSource()
  addFillLayer()
  addLineLayer()
  addHighlightLayer()
  loadDataFromCSV()
  colorLayer()
  createLegend()
  hoverSetup()
  setTimeout(function(){
    setFeatStates()
  }, 500);
}
