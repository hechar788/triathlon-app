import TriathlonController from './actions';
import { DataTable } from '@/app/_components/ui/data-table';
import { columns, TriathlonRow } from './columns';

export default function TriathlonPage() {
    const viewModel = TriathlonController.getViewModel();

    // Transform the view model data to match our column structure
    const data: TriathlonRow[] = viewModel.tableData.rows;

    return (
        <div className="bg-white">
            <div className="flex flex-col items-center w-full pt-8 pb-12 space-y-8">
                {/* Hero Header Section */}
                <div className="text-center w-full max-w-6xl px-4">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                            <span className="text-2xl">🏊‍♂️</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                            Triathlon Central
                        </h1>
                        <div className="flex justify-center mb-6">
                            <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                                Discover the world of triathlon racing with our comprehensive guide to distances, 
                                difficulty levels, and training requirements across all major race categories.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sport Categories Grid */}
                <div className="w-full max-w-6xl px-4 mt-2 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        <div className="group h-full">
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-3xl"></div>
                                <div className="relative text-center space-y-5 h-full flex flex-col justify-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto">
                                        <span className="text-2xl">🏊‍♂️</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-800">Swimming</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">Open water and pool swimming disciplines</p>
                                        <div className="flex items-center justify-center space-x-3 text-blue-600">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm font-medium">Distances: 0.4km - 3.8km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group h-full">
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-3xl"></div>
                                <div className="relative text-center space-y-5 h-full flex flex-col justify-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto">
                                        <span className="text-2xl">🚴‍♂️</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-800">Cycling</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">Road cycling and time trial events</p>
                                        <div className="flex items-center justify-center space-x-3 text-green-600">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-medium">Distances: 10km - 180km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group h-full">
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 rounded-3xl"></div>
                                <div className="relative text-center space-y-5 h-full flex flex-col justify-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto">
                                        <span className="text-2xl">🏃‍♂️</span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-800">Running</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">Road running and trail disciplines</p>
                                        <div className="flex items-center justify-center space-x-3 text-orange-600">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <span className="text-sm font-medium">Distances: 2.5km - 42.2km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Race Categories Section */}
                <div className="w-full max-w-6xl px-4">
                    <div className="text-center space-y-4 mb-8">
                        <div className="flex justify-center">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
                                <span className="text-lg">🏆</span>
                                <h2 className="text-lg font-bold">Race Categories & Distances</h2>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-hidden">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
