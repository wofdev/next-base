"use client"

export default function Dashboard() {
  return (
    <div className="min-h-screen flex justify-center relative overflow-hidden">

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-24">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            Welcome to Dashboard
          </h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Start exploring from the left menu...
        </p>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
          <div className="w-2 h-2 rounded-full bg-secondary" />
          <div className="h-1 w-12 bg-gradient-to-l from-secondary to-transparent rounded-full" />
        </div>
      </div>
    </div>
  )
}
