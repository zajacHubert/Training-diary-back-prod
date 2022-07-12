export interface SingleTraining {
    id: string;
    title: string;
    date: string;
    exerciseName: string;
    reps: string;
    weights: string;
}

export interface NewSingleTraining extends Omit<SingleTraining, 'id'> {
    id?: string;
}

export interface SimpleExerciseToAddToTraining {
    exerciseName: string;
    reps: string;
    weights: string;
}

export type Trainings = SingleTraining[];