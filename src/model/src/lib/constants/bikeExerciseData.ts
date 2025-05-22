import { IExercise } from "../interfaces/iExercise";
import { BikeExercises } from "../enums/exercises";
import { RepUnit } from "../enums/units";
import { Difficulty } from "../enums/difficulty";
import { Sport } from "../enums/sport";
import { Muscle } from "../enums/muscle";

export const BIKE_EXERCISE_DATA: Record<BikeExercises, IExercise> = {
    [BikeExercises.CADENCE_DRILLS]: {
        type: Sport.BIKE,
        name: BikeExercises.CADENCE_DRILLS,
        description: "Pedaling at high cadence (90-110 rpm) with low resistance to improve pedaling efficiency",
        targetMuscles: [Muscle.CALVES, Muscle.HIP_FLEXORS, Muscle.NEUROMUSCULAR_COORDINATION],
        defaultSets: 5,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [BikeExercises.ONE_LEGGED_PEDALING]: {
        type: Sport.BIKE,
        name: BikeExercises.ONE_LEGGED_PEDALING,
        description: "Pedal with one leg while the other leg rests on a platform or unclipped",
        targetMuscles: [Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.PEDALING_TECHNIQUE],
        defaultSets: 3,
        defaultReps: 1,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [BikeExercises.SEATED_FLAT_ROAD_INTERVALS]: {
        type: Sport.BIKE,
        name: BikeExercises.SEATED_FLAT_ROAD_INTERVALS,
        description: "Moderate intensity intervals on flat terrain while maintaining proper form",
        targetMuscles: [Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.GLUTES, Muscle.AEROBIC_SYSTEM],
        defaultSets: 4,
        defaultReps: 5,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [BikeExercises.SPIN_UPS]: {
        type: Sport.BIKE,
        name: BikeExercises.SPIN_UPS,
        description: "Gradually increase cadence from 70 to 110+ rpm over 30 seconds",
        targetMuscles: [Muscle.FAST_TWITCH_FIBERS, Muscle.NEUROMUSCULAR_COORDINATION],
        defaultSets: 5,
        defaultReps: 3,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [BikeExercises.SEATED_HILL_CLIMBS]: {
        type: Sport.BIKE,
        name: BikeExercises.SEATED_HILL_CLIMBS,
        description: "Climbing hills while remaining seated with proper form and consistent cadence",
        targetMuscles: [Muscle.QUADS, Muscle.GLUTES, Muscle.CORE_STABILITY],
        defaultSets: 3,
        defaultReps: 4,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [BikeExercises.STANDING_HILL_CLIMBS]: {
        type: Sport.BIKE,
        name: BikeExercises.STANDING_HILL_CLIMBS,
        description: "Out-of-saddle climbing focusing on smooth weight transfer and upper body control",
        targetMuscles: [Muscle.QUADS, Muscle.GLUTES, Muscle.CORE, Muscle.UPPER_BODY],
        defaultSets: 3,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [BikeExercises.TEMPO_INTERVALS]: {
        type: Sport.BIKE,
        name: BikeExercises.TEMPO_INTERVALS,
        description: "Sustained efforts at 75-85% of FTP (Functional Threshold Power)",
        targetMuscles: [Muscle.SLOW_TWITCH_FIBERS, Muscle.LACTATE_THRESHOLD],
        defaultSets: 3,
        defaultReps: 10,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [BikeExercises.PEDALING_EFFICIENCY_DRILLS]: {
        type: Sport.BIKE,
        name: BikeExercises.PEDALING_EFFICIENCY_DRILLS,
        description: "Focus on smooth, circular pedal stroke (scraping mud off shoes)",
        targetMuscles: [Muscle.HAMSTRINGS, Muscle.CALVES, Muscle.PEDALING_TECHNIQUE],
        defaultSets: 3,
        defaultReps: 5,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [BikeExercises.VO2_MAX_INTERVALS]: {
        type: Sport.BIKE,
        name: BikeExercises.VO2_MAX_INTERVALS,
        description: "Short, high-intensity intervals at 106-120% of FTP with equal recovery",
        targetMuscles: [Muscle.FULL_LOWER_BODY, Muscle.CARDIOVASCULAR_SYSTEM, Muscle.VO2_MAX],
        defaultSets: 6,
        defaultReps: 3,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [BikeExercises.MICRO_BURST_TRAINING]: {
        type: Sport.BIKE,
        name: BikeExercises.MICRO_BURST_TRAINING,
        description: "15-second all-out efforts followed by 15 seconds of recovery",
        targetMuscles: [Muscle.FAST_TWITCH_FIBERS, Muscle.ANAEROBIC_CAPACITY],
        defaultSets: 10,
        defaultReps: 4,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [BikeExercises.THRESHOLD_POWER_INTERVALS]: {
        type: Sport.BIKE,
        name: BikeExercises.THRESHOLD_POWER_INTERVALS,
        description: "Sustained efforts at 95-105% of FTP to improve lactate threshold",
        targetMuscles: [Muscle.FULL_LOWER_BODY, Muscle.LACTATE_CLEARANCE],
        defaultSets: 4,
        defaultReps: 8,
        defaultRepUnitType: RepUnit.MINUTE,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [BikeExercises.STANDING_START_SPRINTS]: {
        type: Sport.BIKE,
        name: BikeExercises.STANDING_START_SPRINTS,
        description: "From a complete stop, accelerate to maximum power as quickly as possible",
        targetMuscles: [Muscle.QUADS, Muscle.GLUTES, Muscle.EXPLOSIVE_POWER],
        defaultSets: 5,
        defaultReps: 3,
        defaultRepUnitType: RepUnit.REPETITION,
        defaultDifficulty: Difficulty.ADVANCED
    }
};