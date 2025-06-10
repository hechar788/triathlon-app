// triathlon.test.ts
import { Triathlon } from "../model/components/triathlon/triathlon";
import { TriathlonType } from "../model/lib/enums/triathlonType";
import { Difficulty } from "../model/lib/enums/difficulty";
import { Sport } from "../model/lib/enums/sport";
import { Distance } from "../model/components/util/distance";

describe('Triathlon', () => {
  describe('getAllTriathlonInformation', () => {
    it('should return information for all triathlon types', () => {
      const allInfo = Triathlon.getAllTriathlonInformation();
      
      // Check if all triathlon types are present
      expect(Object.keys(allInfo).length).toBe(6);
      expect(allInfo[TriathlonType.SUPER_SPRINT]).toBeDefined();
      expect(allInfo[TriathlonType.SPRINT]).toBeDefined();
      expect(allInfo[TriathlonType.STANDARD]).toBeDefined();
      expect(allInfo[TriathlonType.HALF_IRONMAN]).toBeDefined();
      expect(allInfo[TriathlonType.PTO_T100]).toBeDefined();
      expect(allInfo[TriathlonType.IRONMAN]).toBeDefined();
    });
  });

  describe('getDifficulty', () => {
    it('should return the correct difficulty for each triathlon type', () => {
      expect(Triathlon.getDifficulty(TriathlonType.SUPER_SPRINT)).toBe(Difficulty.BEGINNER);
      expect(Triathlon.getDifficulty(TriathlonType.SPRINT)).toBe(Difficulty.BEGINNER);
      expect(Triathlon.getDifficulty(TriathlonType.STANDARD)).toBe(Difficulty.INTERMEDIATE);
      expect(Triathlon.getDifficulty(TriathlonType.HALF_IRONMAN)).toBe(Difficulty.ADVANCED);
      expect(Triathlon.getDifficulty(TriathlonType.PTO_T100)).toBe(Difficulty.ADVANCED);
      expect(Triathlon.getDifficulty(TriathlonType.IRONMAN)).toBe(Difficulty.EXPERT);
    });
  });

  describe('getDistances', () => {
    it('should return distances for all sports in a triathlon type', () => {
      const sprintDistances = Triathlon.getDistances(TriathlonType.SPRINT);
      
      expect(sprintDistances[Sport.SWIM].kilometers).toBe(0.75);
      expect(sprintDistances[Sport.BIKE].kilometers).toBe(20);
      expect(sprintDistances[Sport.RUN].kilometers).toBe(5);
    });
  });

  describe('getDistance', () => {
    it('should return the correct distance for a specific sport in a triathlon type', () => {
      expect(Triathlon.getDistance(TriathlonType.IRONMAN, Sport.SWIM).kilometers).toBe(3.8);
      expect(Triathlon.getDistance(TriathlonType.STANDARD, Sport.BIKE).kilometers).toBe(40);
      expect(Triathlon.getDistance(TriathlonType.SUPER_SPRINT, Sport.RUN).kilometers).toBe(2.5);
    });
  });

  describe('getTotalDistance', () => {
    it('should calculate the total distance for a triathlon type', () => {
      // SPRINT: Swim 0.75km + Bike 20km + Run 5km = 25.75km
      expect(Triathlon.getTotalDistance(TriathlonType.SPRINT).kilometers).toBe(25.75);
      
      // IRONMAN: Swim 3.8km + Bike 180km + Run 42.2km = 226km
      expect(Triathlon.getTotalDistance(TriathlonType.IRONMAN).kilometers).toBe(226);
      
      // PTO_T100: Swim 2km + Bike 80km + Run 18km = 100km
      expect(Triathlon.getTotalDistance(TriathlonType.PTO_T100).kilometers).toBe(100);
    });

    it('should return a Distance object', () => {
      const totalDistance = Triathlon.getTotalDistance(TriathlonType.STANDARD);
      expect(totalDistance).toBeInstanceOf(Distance);
    });
  });
});