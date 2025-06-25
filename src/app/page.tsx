import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen">
      <div className="flex flex-col items-center w-full pb-48">
        {/* Main Header */}
        <div className="mb-12 text-center max-w-4xl pt-20 pb-8 px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            BCDE211 Triathlon App
          </h1>
        </div>
        
        {/* Route Information */}
        <div className="w-[90%] max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Training Management Preview */}
            <Link href="/training" className="group">
              <div className="border border-slate-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Training Management</h2>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Create and manage custom training plans with exercises for swimming, cycling, and running.
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  <span>Manage Training Plans</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Triathlon Information Preview */}
            <Link href="/triathlon" className="group">
              <div className="border border-slate-200 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Triathlon Options</h2>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Explore standard triathlon race types with distances and difficulty levels.
                </p>
                <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                  <span>View Race Options</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
