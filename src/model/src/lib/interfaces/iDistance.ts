import { DistanceUnit } from "../enums/units";

export interface IDistance { 
    [DistanceUnit.KMS]: number;
    [DistanceUnit.METERS]: number;
}