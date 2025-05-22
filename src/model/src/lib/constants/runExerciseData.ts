import { IExercise } from "../interfaces/iExercise";
import { RepUnit } from "../enums/units";
import { RunExercises } from "../enums/exercises";
import { Difficulty } from "../enums/difficulty";
import { Sport } from "../enums/sport";
import { Muscle } from "../enums/muscle";

export const RUN_EXERCISE_DATA: Record<RunExercises, IExercise> = {
    [RunExercises.FORM_DRILLS_A_SKIP]: {
        type: Sport.RUN,
        name: RunExercises.FORM_DRILLS_A_SKIP,
        description: "High knee skipping with emphasis on proper arm swing and foot strike",
        targetMuscles: [Muscle.HIP_FLEXORS, Muscle.CALVES, Muscle.NEUROMUSCULAR_COORDINATION],
        defaultSets: 3,
        defaultReps: 20,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [RunExercises.FORM_DRILLS_B_SKIP]: {
        type: Sport.RUN,
        name: RunExercises.FORM_DRILLS_B_SKIP,
        description: "Extension of A-skip with leg kick-out at top of knee drive",
        targetMuscles: [Muscle.HAMSTRINGS, Muscle.HIP_FLEXORS, Muscle.COORDINATION],
        defaultSets: 3,
        defaultReps: 20,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [RunExercises.STRIDES]: {
        type: Sport.RUN,
        name: RunExercises.STRIDES,
        description: "Controlled accelerations to 85-90% of max speed with full recovery",
        targetMuscles: [Muscle.CALVES, Muscle.HAMSTRINGS, Muscle.RUNNING_ECONOMY],
        defaultSets: 2,
        defaultReps: 6,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [RunExercises.RUNNING_DRILLS_BUTT_KICKS]: {
        type: Sport.RUN,
        name: RunExercises.RUNNING_DRILLS_BUTT_KICKS,
        description: "Rapid heel kicks toward glutes while maintaining upright posture",
        targetMuscles: [Muscle.HAMSTRINGS, Muscle.HIP_FLEXORS, Muscle.RUNNING_FORM],
        defaultSets: 3,
        defaultReps: 20,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [RunExercises.TEMPO_RUNS]: {
        type: Sport.RUN,
        name: RunExercises.TEMPO_RUNS,
        description: "Sustained running at comfortably hard pace (85-90% of max heart rate)",
        targetMuscles: [Muscle.AEROBIC_SYSTEM, Muscle.LACTATE_THRESHOLD],
        defaultSets: 1,
        defaultReps: 20,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [RunExercises.HILL_REPEATS]: {
        type: Sport.RUN,
        name: RunExercises.HILL_REPEATS,
        description: "Uphill running at hard effort with downhill recovery jog",
        targetMuscles: [Muscle.QUADS, Muscle.GLUTES, Muscle.CALVES, Muscle.POWER],
        defaultSets: 2,
        defaultReps: 6,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [RunExercises.FARTLEK_TRAINING]: {
        type: Sport.RUN,
        name: RunExercises.FARTLEK_TRAINING,
        description: "Alternating between fast and easy pace based on landmarks or time",
        targetMuscles: [Muscle.AEROBIC_SYSTEM, Muscle.ANAEROBIC_SYSTEM, Muscle.MENTAL_ADAPTABILITY],
        defaultSets: 1,
        defaultReps: 8,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [RunExercises.PROGRESSION_RUNS]: {
        type: Sport.RUN,
        name: RunExercises.PROGRESSION_RUNS,
        description: "Gradually increasing pace throughout the run, finishing at threshold pace",
        targetMuscles: [Muscle.AEROBIC_ENDURANCE, Muscle.PACING_CONTROL],
        defaultSets: 1,
        defaultReps: 30,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [RunExercises.TRACK_INTERVALS_400M]: {
        type: Sport.RUN,
        name: RunExercises.TRACK_INTERVALS_400M,
        description: "Fast 400m repeats at 5K pace or faster with recovery jogs",
        targetMuscles: [Muscle.VO2_MAX, Muscle.SPEED_ENDURANCE],
        defaultSets: 2,
        defaultReps: 6,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [RunExercises.TRACK_INTERVALS_800M]: {
        type: Sport.RUN,
        name: RunExercises.TRACK_INTERVALS_800M,
        description: "800m repeats at 5K-10K pace with recovery jogs",
        targetMuscles: [Muscle.LACTATE_THRESHOLD, Muscle.MENTAL_TOUGHNESS],
        defaultSets: 1,
        defaultReps: 6,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [RunExercises.YASSO_800S]: {
        type: Sport.RUN,
        name: RunExercises.YASSO_800S,
        description: "800m repeats with equal time recovery, used for marathon training",
        targetMuscles: [Muscle.AEROBIC_ENDURANCE, Muscle.MARATHON_SPECIFIC_FITNESS],
        defaultSets: 1,
        defaultReps: 10,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [RunExercises.PLYOMETRIC_TRAINING]: {
        type: Sport.RUN,
        name: RunExercises.PLYOMETRIC_TRAINING,
        description: "Explosive jumping exercises (box jumps, bounding, jump squats)",
        targetMuscles: [Muscle.FAST_TWITCH_FIBERS, Muscle.POWER, Muscle.RUNNING_ECONOMY],
        defaultSets: 4,
        defaultReps: 10,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    }
};