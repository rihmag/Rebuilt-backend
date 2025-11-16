// models/PageAnalytics.js
import mongoose from "mongoose";

const pageVisitSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userAgent: {
    type: String
  },
  sessionId: {
    type: String
  }
});

const timeSpentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String
  }
});

const PageVisit = mongoose.model('PageVisit', pageVisitSchema);
const TimeSpent = mongoose.model('TimeSpent', timeSpentSchema);

export { PageVisit, TimeSpent };
