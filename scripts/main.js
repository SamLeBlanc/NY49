const main = () => {
  setup()
  addSource()
  addFillLayer()
  addLineLayer()
  addHighlightLayer()
  loadDataFromCSV()
  colorMap()
  createLegend()
  startMousefollower()
  hoverSetup()
  setTimeout(() => {
    setFeatStates()
  }, 500);
}
const setup = () => {
  $('#legend').css("left", 530);
  $('#legend2').css("left", 650);
  $('#legend4').css("left", 770);
  $('#legend3').css("left", 890);
  $('#legend5').css("left", 1010);
}
