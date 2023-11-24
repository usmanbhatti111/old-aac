import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dealPiplineId: {
    type: String,
    required: false,
  },
  dealStageId: {
    type: String,
    required: false,
  },
  dealOwnerId: {
    type: String,
    required: false,
  },
  closeDate: Date,
  type: {
    type: String,
    required: false,
  },
  contactedPersonId: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  addLineItemId: {
    type: String,
    required: false,
  },
  billingFrequency: {
    type: String,
    required: false,
  },
  contactMode: {
    type: String,
    required: false,
  },
  probability: {
    type: Number,
    required: false,
  },
  activitiesIds: {
    type: [String],
    required: false,
  },
  contactsIds: {
    type: [String],
    required: false,
  },
  ticketsIds: {
    type: [String],
    required: false,
  },
  companiesIds: {
    type: [String],
    required: false,
  },
  productsIds: {
    type: [String],
    required: false,
  },
  quotesIds: {
    type: [String],
    required: false,
  },
  attachmentsIds: {
    type: [String],
    required: false,
  },
  playbooksIds: {
    type: [String],
    required: false,
  },
  tasksIds: {
    type: [String],
    required: false,
  },
  notesIds: {
    type: [String],
    required: false,
  },
  callsIds: {
    type: [String],
    required: false,
  },
  emailsIds: {
    type: [String],
    required: false,
  },
  meetingsIds: {
    type: [String],
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
  },
  updatedBy: {
    type: String,
    required: false,
  },
  deletedBy: {
    type: String,
    required: false,
  },
  isDeleted: {
    type: String,
    required: false,
  },
});

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;

