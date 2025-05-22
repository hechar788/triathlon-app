import { getAllTriathlonData, getTriathlonTypes, getSportTypes, formatDistance } from './actions';
import { Difficulty } from '@/model/src/lib/enums/difficulty';

export default function TriathlonPage() {
    const triathlonData = getAllTriathlonData();
    const triathlonTypes = getTriathlonTypes();
    const sportTypes = getSportTypes();

    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 border-b text-left">Type</th>
                            <th className="px-6 py-3 border-b text-left">Difficulty</th>
                            {sportTypes.map((sport) => (
                                <th key={sport} className="px-6 py-3 border-b text-left">
                                    {sport} Distance
                                </th>
                            ))}
                            <th className="px-6 py-3 border-b text-left">Total Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {triathlonTypes.map((type) => {
                            const info = triathlonData[type];
                            const totalDistance = Object.values(info.distances)
                                .reduce((sum, distance) => sum + distance.kilometers, 0);

                            return (
                                <tr key={type} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">
                                        {type.replace(/_/g, ' ')}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <span className={`inline-block px-2 py-1 rounded ${
                                            info.difficulty === Difficulty.BEGINNER ? 'bg-green-100 text-green-800' :
                                            info.difficulty === Difficulty.INTERMEDIATE ? 'bg-yellow-100 text-yellow-800' :
                                            info.difficulty === Difficulty.ADVANCED ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {info.difficulty}
                                        </span>
                                    </td>
                                    {sportTypes.map((sport) => (
                                        <td key={sport} className="px-6 py-4 border-b">
                                            {formatDistance(info.distances[sport].kilometers)}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 border-b font-semibold">
                                        {formatDistance(totalDistance)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
