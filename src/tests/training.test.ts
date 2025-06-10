import TrainingManagement from "../model/components/training/management/trainingManagement"
import { TrainingOptions } from "../model/components/training/options/trainingOptions";
import TrainingPlan from "../model/components/training/plan/trainingPlan";
import TrainingExercise from "../model/components/training/exercise/trainingExercise";
import { Difficulty } from "../model/lib/enums/difficulty";
import { RunExercises, SwimExercises } from "../model/lib/enums/exercises";
import { Sport } from "../model/lib/enums/sport";
import { IExercise } from "../model/lib/interfaces/iExercise";
import { RepUnit } from "../model/lib/enums/units";

describe("Training Management", function() {
    let trainingManager: TrainingManagement;
    const TRAINING_PLAN_NAME = 'Test Plan';

    beforeEach(() => {
        trainingManager = new TrainingManagement()
    })

    test("should have a default empty trainee name: ''", () => {
        const name = trainingManager.getTraineeName();
        expect(name).toBe('')
    })

    test("should be able to update the trainee name", () => {
        const EXPECTED_NAME = 'Hector';
        trainingManager.setTraineeName(EXPECTED_NAME);
        let actualName = trainingManager.getTraineeName();
        expect(actualName).toBe(EXPECTED_NAME)
    })

    test("should throw an error if getting a Training Plan at non-existent index", ()=>{
        expect(()=>{trainingManager.getTrainingPlanAt(10)}).toThrow()
    })

    test("should throw an error if getting a Training Plan with non-existent name", ()=>{
        expect(()=>{trainingManager.getTrainingPlan("Try Again")}).toThrow()
    })

    test("should throw an error if removing a Training Plan at non-existent index", ()=>{
        expect(()=>{trainingManager.removeTrainingPlanAt(100)}).toThrow();
    })

    test("should throw an error when getting an exercise with a name that doesnt exist", ()=>{
        expect(()=>{TrainingOptions.getExerciseByName("boo")}).toThrow();
    })

    test("should throw an error when getting an exercise with a name/sport that doesnt exist", ()=>{
        expect(()=>{TrainingOptions.getExerciseByNameForSport(SwimExercises.BILATERAL_BREATHING_PRACTICE, Sport.BIKE)}).toThrow();
    })

    describe("Training Management contains Training Options", function() {
        test("should be able to get all available default exercise names", ()=>{
            let expectedNames = TrainingOptions.getAllExerciseNames();
            let actualNames = trainingManager.getAllExerciseNames();
            expect(actualNames).toEqual(expectedNames)
        })
        test("should be able to get all default exercises", ()=>{
            let expectedExercises = TrainingOptions.getAllExercises();
            let actualExercises = trainingManager.getAllExercises();
            expect(actualExercises).toEqual(expectedExercises)
        })
        test("should be able to get count of default exercises in all sports", ()=>{
            let expectedCount = TrainingOptions.getAllExercisesCount();
            let actualCount = trainingManager.getAllExercisesCount();
            expect(actualCount).toEqual(expectedCount)
        })
        test("should be able to get all default exercise of a particular difficulty", ()=>{
            let expectedExercises = TrainingOptions.getAllExercisesOfDifficulty(Difficulty.EXPERT);
            let actualExercises = trainingManager.getAllExercisesOfDifficulty(Difficulty.EXPERT);
            expect(actualExercises).toEqual(expectedExercises)
        })
        test("should be able to get all default exercise for a particular sport", ()=>{
            let expectedExercises = TrainingOptions.getAllExercisesForSport(Sport.BIKE);
            let actualExercises = trainingManager.getAllExercisesForSport(Sport.BIKE);
            expect(actualExercises).toEqual(expectedExercises)
        })
        test("should be able to get count of the default exercises in a particular sport", ()=>{
            let expectedExercises = TrainingOptions.getExerciseCountForSport(Sport.RUN);
            let actualExercises = trainingManager.getExerciseCountForSport(Sport.RUN);
            expect(actualExercises).toEqual(expectedExercises)
        })
        test("should be able to get the default exercises of a particular difficulty in a specific sport", ()=>{
            let expectedExercises = TrainingOptions.getExercisesForSportOfDifficulty(Sport.RUN, Difficulty.INTERMEDIATE);
            let actualExercises = trainingManager.getExercisesForSportOfDifficulty(Sport.RUN, Difficulty.INTERMEDIATE);
            expect(actualExercises).toEqual(expectedExercises)
        })
        test("should be able to get a default exercises by its name", ()=>{
            let expectedExercise = TrainingOptions.getExerciseByName(SwimExercises.BILATERAL_BREATHING_PRACTICE);
            let actualExercise = trainingManager.getExerciseByName(SwimExercises.BILATERAL_BREATHING_PRACTICE);
            expect(actualExercise).toEqual(expectedExercise)
        })
        test("should be able to get a default exercises by its name in a particular sport", ()=>{
            let expectedExercise = TrainingOptions.getExerciseByNameForSport(SwimExercises.BILATERAL_BREATHING_PRACTICE, Sport.SWIM);
            let actualExercise = trainingManager.getExerciseByNameForSport(SwimExercises.BILATERAL_BREATHING_PRACTICE, Sport.SWIM);
            expect(actualExercise).toEqual(expectedExercise)
        })
    })

    describe("Training Management can Create, Check, Get, Delete Training Plans", function() {
        beforeEach(()=>{
            trainingManager.createTrainingPlan(TRAINING_PLAN_NAME);
        })

        test("should get training plans sorted by difficulty", ()=>{
            trainingManager.createTrainingPlan("temp", Difficulty.ADVANCED);
            trainingManager.createTrainingPlan("temp2", Difficulty.INTERMEDIATE);
            let sortedPlans = trainingManager.getSortedTrainingPlansByDifficulty()
            expect(sortedPlans[1].getDifficulty()).toBe(Difficulty.INTERMEDIATE)
        })

        test("should be able to create a training plan", () => {
            trainingManager.createTrainingPlan();
            let finalCount = trainingManager.getCountOfTrainingPlans();
            expect(finalCount).toBe(2)
        })

        test("should be able to check a training plan exists by name", () => {
            let exists = trainingManager.checkTrainingPlanExists(TRAINING_PLAN_NAME);
            expect(exists).toBe(true)
        })

        test("should be able to get all training plans", () => {
            let plans = trainingManager.getTrainingPlans();
            expect(plans.length).toBe(1)
        })

        test("should be able to get a training plan by name", () => {
            let trainingPlan = trainingManager.getTrainingPlan(TRAINING_PLAN_NAME);
            expect(trainingPlan.getName()).toBe(TRAINING_PLAN_NAME)
        })

        test("should be able to get a training plan by index", () => {
            let trainingPlan = trainingManager.getTrainingPlanAt(0);
            expect(trainingPlan.getName()).toBe(TRAINING_PLAN_NAME)
        })

        test("should be able to delete a plan by name", () => {
            trainingManager.removeTrainingPlan(TRAINING_PLAN_NAME);
            expect(trainingManager.getCountOfTrainingPlans()).toBe(0)
        })

        test("should be able to delete a plan by index", () => {
            trainingManager.removeTrainingPlanAt(0);
            expect(trainingManager.getCountOfTrainingPlans()).toBe(0)
        })

        describe(`Training Plan can Get and Update properties`, function() {
            let trainingPlan: TrainingPlan;
            
            beforeEach(() => {
                trainingPlan = trainingManager.getTrainingPlan(TRAINING_PLAN_NAME);
            })
 
            test(`should have a .#name of ${TRAINING_PLAN_NAME}`, function() {
                let actualName = trainingPlan.getName();
                expect(actualName).toBe(TRAINING_PLAN_NAME)
            })

            test(`should be able to update the Training Plan name`, function() {
                const NEW_PLAN_NAME = 'New Plan Name'
                trainingPlan.setName(NEW_PLAN_NAME);
                expect(trainingPlan.getName()).toBe(NEW_PLAN_NAME)
            })

            test(`should have a default .#difficulty of ${Difficulty.UNKNOWN}`, function() {
                let actualDifficulty = trainingPlan.getDifficulty();
                expect(actualDifficulty).toBe(Difficulty.UNKNOWN)
            })

            test(`should be able to update the Training Plan difficulty`, function() {
                const NEW_PLAN_DIFFICULTY = Difficulty.BEGINNER
                trainingPlan.setDifficulty(NEW_PLAN_DIFFICULTY);
                expect(trainingPlan.getDifficulty()).toBe(NEW_PLAN_DIFFICULTY)
            })

            test("should have an empty Training Exercises array", function() {
                let actualArray = trainingPlan.getTrainingExercises();
                expect(actualArray).toEqual([])
            })

            test("should throw an error when getting a training exercise that doesnt exist", ()=>{
                expect(()=>{trainingPlan.getExercise(SwimExercises.BILATERAL_BREATHING_PRACTICE)}).toThrow();
            })

            test("should throw an error when getting a training exercise at wrong index", ()=>{
                expect(()=>{trainingPlan.getExerciseAt(10)}).toThrow();
            })

            test("should throw an error when removing a training exercise at wrong index", ()=>{
                expect(()=>{trainingPlan.removeExerciseAt(10)}).toThrow();
            })

            describe(`Training Plan should be able to Add, Get and Remove Exercises`, function() {
                beforeEach(()=>{
                    trainingPlan.addExercise(TrainingOptions.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE))
                })
                test("should be able to get a TrainingExercise by name", function() {
                    let actualExercise = trainingPlan.getExercise(SwimExercises.CATCH_UP_FREESTYLE)
                    expect(actualExercise.description).toEqual(TrainingOptions.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).description)
                })

                test("should be able to add a TrainingExercise with defaults", function() {
                    trainingPlan.addExercise(TrainingOptions.getExerciseByName(SwimExercises.DESCENDING_PACE_SETS))
                    expect(trainingPlan.getExercise(SwimExercises.DESCENDING_PACE_SETS).getDifficulty()).toEqual(TrainingOptions.getExerciseByName(SwimExercises.DESCENDING_PACE_SETS).defaultDifficulty)
                })
                test("should be able to get a TrainingExercise by index", function() {
                    let actualExercise = trainingPlan.getExerciseAt(0)
                    expect(actualExercise.description).toEqual(TrainingOptions.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).description)
                })
                test("should be able to get a count of TrainingExercises", function() {
                    let expectedCount = 1;
                    let actualCount = trainingPlan.getCountOfExercises();
                    expect(actualCount).toEqual(expectedCount)
                })
                test("should be able to remove a TrainingExercise by name", function() {
                    let expectedCount = 0;
                    trainingPlan.removeExercise(SwimExercises.CATCH_UP_FREESTYLE)
                    let actualCount = trainingPlan.getCountOfExercises()
                    expect(actualCount).toEqual(expectedCount)
                })
                test("should be able to remove a TrainingExercise by index", function() {
                    let expectedCount = 0;
                    trainingPlan.removeExerciseAt(0)
                    let actualCount = trainingPlan.getCountOfExercises()
                    expect(actualCount).toEqual(expectedCount)
                })

                describe(`Training Exercises can Get and Update properties`, function() {
                    let trainingExercise: TrainingExercise;
    
                    beforeEach(()=>{
                        trainingExercise = trainingPlan.getExercise(SwimExercises.CATCH_UP_FREESTYLE);
                    })
    
                    test(`should be able to get public readonly properties 
                        type, name, description, targetMuscles, defaultSets, defaultReps, defaultRepUnitType, defaultDifficulty`,
                        ()=>{
                            let publicMembers: IExercise = {
                                type: trainingExercise.type, 
                                name: trainingExercise.name, 
                                description: trainingExercise.description, 
                                targetMuscles: trainingExercise.targetMuscles, 
                                defaultSets: trainingExercise.defaultSets, 
                                defaultReps: trainingExercise.defaultReps, 
                                defaultRepUnitType: 
                                trainingExercise.defaultRepUnitType, 
                                defaultDifficulty: 
                                trainingExercise.defaultDifficulty
                            }
                            let expectedExerciseMembers = trainingManager.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE)
                            expect(publicMembers).toEqual(expectedExerciseMembers)
                        }
                    )

                    test("should be able to get the number of sets in the exercise", ()=>{
                        let expectedSets = trainingManager.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).defaultSets;
                        let actualSets = trainingExercise.getSets();
                        expect(actualSets).toEqual(expectedSets)
                    })
                    test("should be able to get the number of reps in the exercise", ()=>{
                        let expectedReps = trainingManager.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).defaultReps;
                        let actualReps = trainingExercise.getReps();
                        expect(actualReps).toEqual(expectedReps)
                    })
                    test("should be able to get the Difficulty of the exercise", ()=>{
                        let expectedDifficulty = trainingManager.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).defaultDifficulty;
                        let actualDifficulty = trainingExercise.getDifficulty();
                        expect(actualDifficulty).toEqual(expectedDifficulty)
                    })
                    test("should be able to get the RepUnit of the exercise", ()=>{
                        let expectedRepUnit = trainingManager.getExerciseByName(SwimExercises.CATCH_UP_FREESTYLE).defaultRepUnitType;
                        let actualRepUnit = trainingExercise.getRepUnits();
                        expect(actualRepUnit).toEqual(expectedRepUnit)
                    })

                    test("should be able to update the number of sets in the exercise", ()=>{
                        const EXPECTED_SETS = 10;
                        trainingExercise.setSets(EXPECTED_SETS);
                        let actualSets = trainingExercise.getSets();
                        expect(actualSets).toEqual(EXPECTED_SETS)
                    })
                    test("should be able to update the number of reps in the exercise", ()=>{
                        const EXPECTED_REPS = 10;
                        trainingExercise.setReps(EXPECTED_REPS)
                        let actualReps = trainingExercise.getReps();
                        expect(actualReps).toEqual(EXPECTED_REPS)
                    })
                    test("should be able to update the Difficulty of the exercise", ()=>{
                        const EXPECTED_DIFFICULTY = Difficulty.INTERMEDIATE;
                        trainingExercise.setDifficulty(EXPECTED_DIFFICULTY)
                        let actualDifficulty = trainingExercise.getDifficulty();
                        expect(actualDifficulty).toEqual(EXPECTED_DIFFICULTY)
                    })
                    test("should be able to update the RepUnit of the exercise", ()=>{
                        const EXPECTED_REPUNIT = RepUnit.MINUTE;
                        trainingExercise.setRepUnits(EXPECTED_REPUNIT);
                        let actualRepUnit = trainingExercise.getRepUnits();
                        expect(actualRepUnit).toEqual(EXPECTED_REPUNIT)
                    })
                })

                describe(`Training Exercises can revert properties back to defaults`, function() {
                    let trainingExercise: TrainingExercise;
    
                    beforeEach(()=>{
                        trainingPlan.addExercise(trainingManager.getExerciseByName(RunExercises.STRIDES), 50, 50, RepUnit.MINUTE, Difficulty.EXPERT);
                        trainingExercise = trainingPlan.getExercise(RunExercises.STRIDES)
                    })

                    test("Training Exercise can revert all properties", ()=>{
                        let expectedExercise =  trainingManager.getExerciseByName(RunExercises.STRIDES)
                        trainingExercise.revertTrainingExerciseToDefaults();
                        let actualExercise = trainingExercise
                        expect(actualExercise).toEqual(expectedExercise)
                    })
                })
            })
        })
    })
})