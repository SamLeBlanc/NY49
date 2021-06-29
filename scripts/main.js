const main = () => {
  setup()
  addSource()
  addFillLayer()
  addLineLayer()
  addHighlightLayer()
  loadDataFromCSV()
  colorLayer()
  createLegend()
  startMousefollower()
  hoverSetup()
  setTimeout(() => {
    setFeatStates()
  }, 500);
}
const setup = () => {
  if (window.innerWidth <  600) {
    map.fitBounds([[-74.206,40.599],[-74.051,40.749]])
    $('#legend').css("top", window.innerHeight - 190);
  } else {
    map.fitBounds([[-74.206,40.599],[-74.051,40.669]]);
  }
}
