import { Triathlon } from "@/model/src/components/triathlon/triathlon";
import { TriathlonType } from "@/model/src/lib/enums/triathlonType";
import { Sport } from "@/model/src/lib/enums/sport";
import { TriathlonInformation } from "@/model/src/lib/types/triathlonInformation";

export function getAllTriathlonData(): Record<TriathlonType, TriathlonInformation> {
    return Triathlon.getAllTriathlonInformation();
}

export function getTriathlonTypes(): TriathlonType[] {
    return Object.values(TriathlonType);
}

export function getSportTypes(): Sport[] {
    return Object.values(Sport);
}

export function formatDistance(distance: number): string {
    return `${distance} km`;
} 