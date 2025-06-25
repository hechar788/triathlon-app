import TriathlonController from './actions';

export default function TriathlonPage() {
    const actions = new TriathlonController();
    const distanceInfo = actions.getDistanceRangeInfo();

    return (
        <div className="bg-white w-full">
            <div className="flex flex-col items-center w-full pb-48">
                {/* Header Section */}
                <div className="mb-8 text-center max-w-4xl pt-14 pb-8 px-4">
                    <h1 className="text-2xl font-bold text-slate-800 mb-3">
                        Official Triathlon Options
                    </h1>
                    <p className="text-slate-600 text-sm mb-2">
                        Available triathlon distances range from{' '}
                        <span className="font-semibold text-blue-600">{distanceInfo.totalRange}</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                        {distanceInfo.sportSummaries.map((sport, index) => (
                            <span key={sport.sport}>
                                <span className="font-medium">{sport.sport}:</span> {sport.range}
                                {index < distanceInfo.sportSummaries.length - 1 && ' •'}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Table Section */}
                {actions.getTriathlonTable()}
            </div>
        </div>
    );
}
