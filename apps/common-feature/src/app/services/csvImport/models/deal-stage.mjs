import mongoose from "mongoose";

const lifecycleStagesSchema = new mongoose.Schema({
    name: {
      type: String,
    },
  });
  
  const LifecycleStages = mongoose.model("LifecycleStages", lifecycleStagesSchema);
  
  export default LifecycleStages;