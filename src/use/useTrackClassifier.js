const nnOptions = {
  task: "classification",
  debug: false,
};

const nn = ml5.neuralNetwork(nnOptions);

const modelInfo = {
  model: "/models/model.json",
  metadata: "/models/model_meta.json",
  weights: "/models/model.weights.bin",
};

async function loadModel() {
  nn.load(modelInfo, () => {
    console.log("model loaded");
  });
}
await loadModel();
export async function classifyTrack(track_features) {
  console.log("Classifying track...");
  const nnInput = {
    valence: track_features.valence,
    energy: track_features.energy,
    danceability: track_features.danceability,
  };

  return nn.classify(nnInput, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    return results;
  });
}
