export default function TrainingPage() {
  return (
    <div className="space-y-12">
      {/* Coming Soon Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-3xl shadow-lg">
          <span className="text-3xl">🚧</span>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-800">
            Training Features Coming Soon
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're building an amazing training experience for you. Check back soon for 
            personalized training plans, workout tracking, and progress analytics.
          </p>
        </div>
      </div>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Custom Plans</h3>
          <p className="text-slate-600 mb-6">
            Personalized training schedules based on your current fitness level and race goals.
          </p>
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
            Coming Soon
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-teal-100">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Progress Tracking</h3>
          <p className="text-slate-600 mb-6">
            Monitor your improvement across swimming, cycling, and running with detailed analytics.
          </p>
          <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium">
            Coming Soon
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-100">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Goal Achievement</h3>
          <p className="text-slate-600 mb-6">
            Set race targets and milestone goals with intelligent recommendations and reminders.
          </p>
          <div className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-2xl">📧</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-emerald-100">
              Be the first to know when our training features launch!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
            <p className="text-emerald-100 text-sm">
              Training features are currently in development. Follow our progress and get notified 
              when they become available.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
