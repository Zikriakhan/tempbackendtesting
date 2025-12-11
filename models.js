const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  content: {
    main: { type: String, default: '' },
    sections: { type: Array, default: [] }
  }
}, { _id: false });

const TestQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true }
}, { _id: false });

const TestSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  questions: { type: [TestQuestionSchema], default: [] }
}, { _id: false });

const ModuleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  topics: { type: [TopicSchema], default: [] },
  test: { type: TestSchema, default: () => ({ title: '', questions: [] }) }
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  icon: { type: String, default: '' },
  modules: { type: [ModuleSchema], default: [] }
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Course
};
