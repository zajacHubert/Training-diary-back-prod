import { Router } from "express";
import { TrainingRecord } from "../records/training.records";

export const trainingRouter = Router();

trainingRouter
    .get('/', async (req, res) => {

        const trainings = await TrainingRecord.getAll();
        res.json(trainings);

    })
    .post('/', async (req, res) => {

        const newTraining = new TrainingRecord(req.body);
        const id = await newTraining.insert();
        res.json(id);
    })
    .get('/:date/:title', async (req, res) => {

        const training = await TrainingRecord.getOneTraining(req.params.date, req.params.title);
        res.json(training);
    })
    .delete('/:date/:title', async (req, res) => {

        const trainingsToRemove = await TrainingRecord.getOneTraining(req.params.date, req.params.title);

        await Promise.all(
            trainingsToRemove.map(async training => {
                await training.delete()
            })
        );

        res.json({
            isSuccess: true,
        });
    })
    .put('/:date/:title', async (req, res) => {
        const exerciseToUpdate = new TrainingRecord(req.body);
        await exerciseToUpdate.update();

        res.json({
            isSuccess: true,
        })
    });