import mongoose from "mongoose";

const dealPipelineSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const DealPipeline = mongoose.model("DealPipeline", dealPipelineSchema);

export default DealPipeline;