const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  content: { type: Object, default: {} }
}, { timestamps: false });

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: String,
  order: Number,
  isPublished: { type: Boolean, default: false },
  topics: { type: [TopicSchema], default: [] }
}, { timestamps: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  icon: String,
  modules: { type: [ModuleSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
