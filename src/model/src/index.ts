import { TriathlonType } from "./lib/enums/triathlonType";
import { Triathlon as t } from "./components/triathlon/triathlon";
import { Sport } from "./lib/enums/sport";
import { DistanceUnit } from "./lib/enums/units";

(()=>{
    const STANDARD = TriathlonType.STANDARD;

    console.log(`\n\n\n${STANDARD} Triathlon Details:`);
    console.log("-------------------------");
    console.log(`Total distance: ${t.getTotalDistance(STANDARD).meters}` + ` ${DistanceUnit.METERS}`);
    console.log(`Difficulty: ${t.getDifficulty(STANDARD)}`);
    console.log("-------------------------");
    console.log(`Swim: ${t.getDistance(STANDARD, Sport.SWIM).kilometers}` + ` ${DistanceUnit.KMS}`);
    console.log(`Bike: ${t.getDistance(STANDARD, Sport.BIKE).kilometers}` + ` ${DistanceUnit.KMS}`);
    console.log(`Run: ${t.getDistance(STANDARD, Sport.RUN).kilometers}` + ` ${DistanceUnit.KMS}`);

    const IRONMAN = TriathlonType.IRONMAN;

    console.log(`\n\n\n${IRONMAN} Triathlon Details:`);
    console.log("-------------------------");
    console.log(`Total distance: ${t.getTotalDistance(IRONMAN).kilometers}` + ` ${DistanceUnit.KMS}`);
    console.log(`Difficulty: ${t.getDifficulty(IRONMAN)}`);
    console.log("-------------------------");
    console.log(`Swim: ${t.getDistance(IRONMAN, Sport.RUN).kilometers}` + ` ${DistanceUnit.KMS}`);
    console.log(`Bike: ${t.getDistance(IRONMAN, Sport.BIKE).kilometers}` + ` ${DistanceUnit.KMS}`);
    console.log(`Run: ${t.getDistance(IRONMAN, Sport.RUN).kilometers}` + ` ${DistanceUnit.KMS}` + `\n\n\n`);
})()