import { Distance } from '../model/components/util/distance';
import { DistanceUnit } from '../model/lib/enums/units';

describe('Distance', () => {
  describe('constructor', () => {
    it('should create a Distance instance with correct values', () => {
      const distance = new Distance(5);
      
      expect(distance).toBeInstanceOf(Distance);
      expect(distance[DistanceUnit.KMS]).toBe(5);
      expect(distance[DistanceUnit.METERS]).toBe(5000);
    });
    
    it('should handle zero values correctly', () => {
      const distance = new Distance(0);
      
      expect(distance[DistanceUnit.KMS]).toBe(0);
      expect(distance[DistanceUnit.METERS]).toBe(0);
    });
    
    it('should handle decimal values correctly', () => {
      const distance = new Distance(1.5);
      
      expect(distance[DistanceUnit.KMS]).toBe(1.5);
      expect(distance[DistanceUnit.METERS]).toBe(1500);
    });
    
    it('should handle negative values correctly', () => {
      const distance = new Distance(-2);
      
      expect(distance[DistanceUnit.KMS]).toBe(-2);
      expect(distance[DistanceUnit.METERS]).toBe(-2000);
    });
    
    it('should handle large values correctly', () => {
      const distance = new Distance(1000);
      
      expect(distance[DistanceUnit.KMS]).toBe(1000);
      expect(distance[DistanceUnit.METERS]).toBe(1000000);
    });
  });
});