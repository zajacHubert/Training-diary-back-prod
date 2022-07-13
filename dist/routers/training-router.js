"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingRouter = void 0;
const express_1 = require("express");
const training_records_1 = require("../records/training.records");
exports.trainingRouter = (0, express_1.Router)();
exports.trainingRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainings = yield training_records_1.TrainingRecord.getAll();
    res.json(trainings);
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTraining = new training_records_1.TrainingRecord(req.body);
    const id = yield newTraining.insert();
    res.json(id);
}))
    .get('/:date/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const training = yield training_records_1.TrainingRecord.getOneTraining(req.params.date, req.params.title);
    res.json(training);
}))
    .delete('/:date/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainingsToRemove = yield training_records_1.TrainingRecord.getOneTraining(req.params.date, req.params.title);
    yield Promise.all(trainingsToRemove.map((training) => __awaiter(void 0, void 0, void 0, function* () {
        yield training.delete();
    })));
    res.json({
        isSuccess: true,
    });
}))
    .put('/:date/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exerciseToUpdate = new training_records_1.TrainingRecord(req.body);
    yield exerciseToUpdate.update();
    res.json({
        isSuccess: true,
    });
}));
//# sourceMappingURL=training-router.js.map