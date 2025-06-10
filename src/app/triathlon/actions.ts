import { Triathlon } from "@/model/components/triathlon/triathlon";
import { TriathlonType } from "@/model/lib/enums/triathlonType";
import { Sport } from "@/model/lib/enums/sport";
import { TriathlonInformation } from "@/model/lib/types/triathlonInformation";
import { TriathlonViewModel } from "./_viewModel/triathlonViewModel";

export default class TriathlonController {
    static readonly #viewModel = new TriathlonViewModel(
        Triathlon.getAllTriathlonInformation(),
        Object.values(TriathlonType),
        Object.values(Sport)
    );

    static getViewModel(): TriathlonViewModel {
        return this.#viewModel;
    }

    static get triathlonData(): Record<TriathlonType, TriathlonInformation> {
        return this.#viewModel.triathlonInformation;
    }

    static get triathlonTypes(): TriathlonType[] {
        return this.#viewModel.triathlonTypes;
    }

    static get sportTypes(): Sport[] {
        return this.#viewModel.sportTypes;
    }

    static formatDistance(distance: number): string {
        return `${distance} km`;
    } 
}