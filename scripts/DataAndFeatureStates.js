//// LOAD DATA AND SET FEATURE STATES

// Load county data via D3, and assign to global variable LORAX
const loadDataFromCSV = () => {
  d3.csv(`data/dat.csv`).then(function(data) {
    LORAX = data;
  });
}

// Set the feature states for each county in the dataset
// Feature states allow for easy data use later on, without having to access the full dataset
// Feature states need to be set for each individual feature (in this case, only 11 counties)
const setFeatStates = () => {
  LORAX.forEach(d => {
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'name'      : d['name']} );
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'demsupport': parseFloat(d['demsupport'])} );
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'repsupport': parseFloat(d['repsupport'])} );
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'share'     : parseFloat(d['share'])} );
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'undecided' : parseFloat(d['undecided'])} );
    map.setFeatureState({ source: 'source', sourceLayer: 'catalist-dqt6kw', id: d.id }, {'hispanic'  : parseFloat(d['hispanic'])} );
  });
}
