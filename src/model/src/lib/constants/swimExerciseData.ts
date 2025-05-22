import { IExercise } from "../interfaces/iExercise";
import { SwimExercises } from "../enums/exercises";
import { RepUnit } from "../enums/units";
import { Difficulty } from "../enums/difficulty";
import { Sport } from "../enums/sport";
import { Muscle } from "../enums/muscle";

export const SWIM_EXERCISE_DATA: Record<SwimExercises, IExercise> = {
    [SwimExercises.FREESTYLE_TECHNIQUE_DRILLS]: {
        type: Sport.SWIM,
        name: SwimExercises.FREESTYLE_TECHNIQUE_DRILLS,
        description: "Focus on proper arm entry, catch, pull, and recovery phases of freestyle stroke",
        targetMuscles: [Muscle.SHOULDERS, Muscle.LATS, Muscle.TRICEPS, Muscle.CORE],
        defaultSets: 4,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [SwimExercises.CATCH_UP_FREESTYLE]: {
        type: Sport.SWIM,
        name: SwimExercises.CATCH_UP_FREESTYLE,
        description: "One arm stays extended while the other completes a full stroke cycle before switching",
        targetMuscles: [Muscle.SHOULDERS, Muscle.LATS, Muscle.CORE_STABILITY],
        defaultSets: 4,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [SwimExercises.FINGERTIP_DRAG_DRILL]: {
        type: Sport.SWIM,
        name: SwimExercises.FINGERTIP_DRAG_DRILL,
        description: "Drag fingertips along water surface during recovery phase to ensure proper elbow position",
        targetMuscles: [Muscle.SHOULDERS, Muscle.ROTATOR_CUFF],
        defaultSets: 3,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [SwimExercises.SCULLING_DRILLS]: {
        type: Sport.SWIM,
        name: SwimExercises.SCULLING_DRILLS,
        description: "Small figure-8 hand movements to improve feel for the water and catch phase",
        targetMuscles: [Muscle.FOREARMS, Muscle.WRISTS, Muscle.PROPRIOCEPTION],
        defaultSets: 3,
        defaultReps: 1,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.BEGINNER
    },
    [SwimExercises.SIX_KICK_ONE_PULL_DRILL]: {
        type: Sport.SWIM,
        name: SwimExercises.SIX_KICK_ONE_PULL_DRILL,
        description: "Six leg kicks followed by one arm stroke to improve kick strength and timing",
        targetMuscles: [Muscle.CORE, Muscle.QUADS, Muscle.HAMSTRINGS, Muscle.GLUTES],
        defaultSets: 4,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [SwimExercises.BILATERAL_BREATHING_PRACTICE]: {
        type: Sport.SWIM,
        name: SwimExercises.BILATERAL_BREATHING_PRACTICE,
        description: "Alternating breathing sides (every 3 strokes) to balance stroke and improve lung capacity",
        targetMuscles: [Muscle.RESPIRATORY_SYSTEM, Muscle.NECK, Muscle.CORE],
        defaultSets: 3,
        defaultReps: 4,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [SwimExercises.DESCENDING_PACE_SETS]: {
        type: Sport.SWIM,
        name: SwimExercises.DESCENDING_PACE_SETS,
        description: "Swimming multiple sets with increasing speed for each subsequent set",
        targetMuscles: [Muscle.FULL_BODY, Muscle.CARDIOVASCULAR_SYSTEM],
        defaultSets: 4,
        defaultReps: 4,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [SwimExercises.FIST_SWIMMING]: {
        type: Sport.SWIM,
        name: SwimExercises.FIST_SWIMMING,
        description: "Swimming with closed fists to reduce surface area and improve feel for the water",
        targetMuscles: [Muscle.FOREARMS, Muscle.SHOULDERS, Muscle.PROPRIOCEPTION],
        defaultSets: 3,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.INTERMEDIATE
    },
    [SwimExercises.NEGATIVE_SPLIT_TRAINING]: {
        type: Sport.SWIM,
        name: SwimExercises.NEGATIVE_SPLIT_TRAINING,
        description: "Swimming the second half of a distance faster than the first half",
        targetMuscles: [Muscle.FULL_BODY, Muscle.CARDIOVASCULAR_SYSTEM, Muscle.MENTAL_ENDURANCE],
        defaultSets: 3,
        defaultReps: 8,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [SwimExercises.HYPOXIC_SETS]: {
        type: Sport.SWIM,
        name: SwimExercises.HYPOXIC_SETS,
        description: "Limited breathing patterns (e.g., breathe every 5, 7, or 9 strokes)",
        targetMuscles: [Muscle.RESPIRATORY_SYSTEM, Muscle.MENTAL_TOUGHNESS],
        defaultSets: 4,
        defaultReps: 2,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [SwimExercises.SPRINT_INTERVALS]: {
        type: Sport.SWIM,
        name: SwimExercises.SPRINT_INTERVALS,
        description: "Maximum effort sprints with full recovery between sets",
        targetMuscles: [Muscle.FAST_TWITCH_FIBERS, Muscle.ANAEROBIC_SYSTEM],
        defaultSets: 8,
        defaultReps: 1,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.ADVANCED
    },
    [SwimExercises.UNDERWATER_DOLPHIN_KICKS]: {
        type: Sport.SWIM,
        name: SwimExercises.UNDERWATER_DOLPHIN_KICKS,
        description: "Powerful dolphin kicks while fully submerged to improve underwater phase",
        targetMuscles: [Muscle.CORE, Muscle.LOWER_BACK, Muscle.QUADS, Muscle.GLUTES],
        defaultSets: 6,
        defaultReps: 0.5,
        defaultRepUnitType: RepUnit.LENGTH,
        defaultDifficulty: Difficulty.ADVANCED
    }
};