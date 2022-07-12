import { FieldPacket } from "mysql2";
import { v4 as uuid } from 'uuid';
import { NewSingleTraining, SingleTraining } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/handleError";

type TrainingRecordResults = [TrainingRecord[], FieldPacket[]];

export class TrainingRecord implements SingleTraining {
    id: string;
    title: string;
    date: string;
    exerciseName: string;
    reps: string;
    weights: string;

    constructor(obj: NewSingleTraining) {

        if (!obj.title || obj.title.length > 40) {
            throw new ValidationError('Nazwa treningu nie może być pusta, ani przekraczać 40 znaków');
        }
        if (obj.date.length > 10) {
            throw new ValidationError('Nieprawidłowa data, zapisz datę w postaci "RRRR-MM-DD" lub wybierz z podpowiedzi');
        }
        if (!obj.date) {
            throw new ValidationError('Podaj datę treiningu');
        }

        this.id = obj.id;
        this.title = obj.title;
        this.date = obj.date;
        this.exerciseName = obj.exerciseName;
        this.reps = obj.reps;
        this.weights = obj.weights;
    }

    static async getAll(): Promise<TrainingRecord[]> {
        const [results] = await pool.execute('SELECT DISTINCT `date`,`title` FROM `trainings` ORDER BY `date`') as TrainingRecordResults;
        return results.map(result => new TrainingRecord(result));
    }

    static async getOneTraining(date: string, title: string): Promise<TrainingRecord[] | null> {
        const [results] = (await pool.execute("SELECT * FROM `trainings` WHERE `date`=:date AND `title`=:title", {
            date,
            title,
        })) as TrainingRecordResults;
        return results.map(result => new TrainingRecord(result));
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Takie treining już istnieje')
        }

        await pool.execute('INSERT INTO `trainings` VALUES(:id, :title, :date, :exerciseName,:reps,:weights)', {
            id: this.id,
            title: this.title,
            date: this.date,
            exerciseName: this.exerciseName,
            reps: this.reps,
            weights: this.weights,
        })

        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `trainings` WHERE `id`=:id", {
            id: this.id,
        })
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `trainings` SET `title`=:title, `date`=:date, `exerciseName`=:exerciseName, `reps`=:reps, `weights`=:weights WHERE `id` = :id", {
            id: this.id,
            title: this.title,
            date: this.date,
            exerciseName: this.exerciseName,
            reps: this.reps,
            weights: this.weights,
        });
    }

}