import mongoose from "mongoose";

const importFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  organizationId: {
    type: String,
  },
  filePath: {
    type: String,
  },
  dataColumn: {
    type: [String],
  },
  status: {
    type: String,
  },
  actionType: {
    type: String,
  },
  
  failedRecords: {
    type: []
  },
  
});

const ImportFile = mongoose.model('ImportFile', importFileSchema);

export default ImportFile;

