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
    </div>
  )
}
