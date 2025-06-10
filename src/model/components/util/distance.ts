import { DistanceUnit } from "../../lib/enums/units";
import { IDistance } from "../../lib/interfaces/iDistance";

export class Distance implements IDistance {
    public readonly [DistanceUnit.KMS]: number;
    public readonly [DistanceUnit.METERS]: number;
    
    constructor(kilometers: number) {
        this[DistanceUnit.KMS] = kilometers;
        this[DistanceUnit.METERS] = kilometers * 1000;
    }
}