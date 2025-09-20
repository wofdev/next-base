"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { CheckCircle, Users, Zap, Star, ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">TopCV</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Dashboard
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Reviews
            </a>
          </nav>

          <div>
            {!session ? (
              <Button
                onClick={() => signIn("keycloak")}
                variant="outline"
                className="text-sm"
                // className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {session.user?.email?.split("@")[0]}</span>
                <Button variant="outline" onClick={() => signOut()} size="sm">
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-card/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 py-12 lg:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm font-medium text-card-foreground">Trusted by 50,000+ professionals</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
              Build Your{" "}
              <div className="bg-gradient-to-r from-rose-800 to-rose-600 bg-clip-text text-transparent">
                TOP CV
              </div>{" "}
              in Minutes
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Create a polished, professional resume that stands out. Our AI-powered builder helps you craft the perfect
              CV with expert templates and personalized suggestions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group"
              >
                Start Building Your CV
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-border hover:bg-muted bg-transparent"
              >
                View Demo
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No design skills required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>ATS-friendly templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Export in multiple formats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Why Choose TopCV?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you hired
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Lightning Fast",
                description:
                  "Create your professional resume in under 10 minutes with our intuitive step-by-step builder.",
              },
              {
                icon: <Sparkles className="w-8 h-8 text-primary" />,
                title: "AI-Powered Suggestions",
                description:
                  "Get personalized content recommendations and industry-specific tips powered by advanced AI.",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Expert Templates",
                description:
                  "Choose from 50+ professionally designed templates created by career experts and recruiters.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">See what our users say about their experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                content:
                  "TopCV helped me land my dream job! The templates are modern and the AI suggestions were spot-on.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                content: "The ATS-friendly templates gave me confidence that my resume would pass initial screenings.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Project Manager",
                content: "I created a professional resume in minutes. The process was incredibly smooth and intuitive.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-card-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Build Your Future?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've already transformed their careers with TopCV
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-4 text-lg"
            >
              Start Building Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">TopCV</span>
            </div>

            <div className="flex space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TopCV. All rights reserved. Built for professionals worldwide.
          </div>
        </div>
      </footer>
    </div>
  )
}

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Home() {
//   const { data: session, status } = useSession()
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
//       {/* Header */}
//       <header className="w-full px-6 py-4 flex justify-between items-center shadow-md mb-6 fixed top-0 bg-white/70 backdrop-blur-sm">
//         <h1 className="text-2xl font-bold ">TopCv</h1>
//         <nav className="space-x-6 ">
//           <a href="/dashboard" className="hover:">Dashboard</a>
//         </nav>
//         <nav>
//             {!session ? <Button onClick={() => signIn("keycloak")} >Sign in</Button> : 
            
//               <div>
//                 <p>Signed in as {session.user?.email}</p>
//                 <button onClick={() => signOut()}>Sign out</button>
//               </div>
//             }
//         </nav>
//       </header>

//       {/* Hero */}
//       <main className="flex-1 flex flex-col items-center justify-center text-center px-6  mt-16 p-10">
//         <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
//           Build Your <span className="text-rose-600">Top CV</span> in Minutes
//         </h2>
//         <p className="mt-4 text-lg  max-w-2xl">
//           Create a polished English resume quickly and easily with our online builder.
//           No design skills required.
//         </p>
//         <div className="mt-6 flex space-x-4">
//           <Button className="rounded-md px-6 py-3">
//             Get Started
//           </Button>
//           <Button variant="outline" className="rounded-md px-6 py-3 border-gray-600 hover:bg-gray-50">
//             View Demo
//           </Button>
//         </div>
//       </main>

//       <section id="features" className="py-20 bg-gray-50 px-6">
//         <h3 className="text-3xl font-bold text-center text-gray-800">Why Choose Us?</h3>
//         <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {
//             [
//               {
//                 title: "Easy to use",
//                 description: "Simple interface that helps you create your resume step by step."
//               },
//               {
//                 title: "Professional Template",
//                 description: "Modern and elegant template designed by experts."
//               },
//               {
//                 title: "Make it online",
//                 description: "Stand out so many people can see who you are!"
//               },
//             ].map(x => (
//               <Card className="shadow-md">
//                 <CardHeader>
//                   <CardTitle className="">{x.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="">
//                   {x.description}
//                 </CardContent>
//               </Card>
//             ))
//           }
//         </div>
//       </section>

//       <footer className="py-6 text-center text-gray-500 bg-white border-t">
//         © {new Date().getFullYear()} TopCv. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// // "use client"


// // export default function Home() {
  

// //   if (status === "loading") {
// //     return <p>Loading...</p>
// //   }


// // }
