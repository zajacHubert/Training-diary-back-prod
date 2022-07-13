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
exports.TrainingRecord = void 0;
const uuid_1 = require("uuid");
const db_1 = require("../utils/db");
const handleError_1 = require("../utils/handleError");
class TrainingRecord {
    constructor(obj) {
        if (!obj.title || obj.title.length > 40) {
            throw new handleError_1.ValidationError('Nazwa treningu nie może być pusta, ani przekraczać 40 znaków');
        }
        if (obj.date.length > 10) {
            throw new handleError_1.ValidationError('Nieprawidłowa data, zapisz datę w postaci "RRRR-MM-DD" lub wybierz z podpowiedzi');
        }
        if (!obj.date) {
            throw new handleError_1.ValidationError('Podaj datę treiningu');
        }
        this.id = obj.id;
        this.title = obj.title;
        this.date = obj.date;
        this.exerciseName = obj.exerciseName;
        this.reps = obj.reps;
        this.weights = obj.weights;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute('SELECT DISTINCT `date`,`title` FROM `trainings` ORDER BY `date`');
            return results.map(result => new TrainingRecord(result));
        });
    }
    static getOneTraining(date, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield db_1.pool.execute("SELECT * FROM `trainings` WHERE `date`=:date AND `title`=:title", {
                date,
                title,
            }));
            return results.map(result => new TrainingRecord(result));
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            else {
                throw new handleError_1.ValidationError('Takie treining już istnieje');
            }
            yield db_1.pool.execute('INSERT INTO `trainings` VALUES(:id, :title, :date, :exerciseName,:reps,:weights)', {
                id: this.id,
                title: this.title,
                date: this.date,
                exerciseName: this.exerciseName,
                reps: this.reps,
                weights: this.weights,
            });
            return this.id;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("DELETE FROM `trainings` WHERE `id`=:id", {
                id: this.id,
            });
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute("UPDATE `trainings` SET `title`=:title, `date`=:date, `exerciseName`=:exerciseName, `reps`=:reps, `weights`=:weights WHERE `id` = :id", {
                id: this.id,
                title: this.title,
                date: this.date,
                exerciseName: this.exerciseName,
                reps: this.reps,
                weights: this.weights,
            });
        });
    }
}
exports.TrainingRecord = TrainingRecord;
//# sourceMappingURL=training.records.js.map