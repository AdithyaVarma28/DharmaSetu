import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, Users, Building, Shield, Award } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DharmaSetu</span>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center gap-4">
            <Link href="/app">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About DharmaSetu</h1>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Our mission is to democratize legal knowledge and make justice accessible to all citizens
            </p>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="privacy" id="privacy">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="terms" id="terms">
                Terms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <div className="grid gap-8">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <p>
                    DharmaSetu was founded with a simple yet powerful vision: to bridge the gap between complex legal
                    systems and everyday citizens. In a world where legal knowledge is often inaccessible due to complex
                    language, high costs, and systemic barriers, we set out to create a platform that leverages AI
                    technology to democratize access to justice.
                  </p>
                  <p className="mt-4">
                    Our team of legal experts, technologists, and civic engagement specialists work together to build
                    tools that simplify legal language, predict case outcomes, review contracts, and create
                    community-driven solutions to legal challenges.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
                  {[
                    {
                      title: "Our Team",
                      description: "Meet the experts behind DharmaSetu",
                      icon: <Users className="h-10 w-10 text-primary" />,
                    },
                    {
                      title: "Our Partners",
                      description: "Organizations we collaborate with",
                      icon: <Building className="h-10 w-10 text-primary" />,
                    },
                    {
                      title: "Our Values",
                      description: "The principles that guide our work",
                      icon: <Shield className="h-10 w-10 text-primary" />,
                    },
                    {
                      title: "Recognition",
                      description: "Awards and acknowledgments",
                      icon: <Award className="h-10 w-10 text-primary" />,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-center mb-2">{item.icon}</div>
                        <CardTitle className="text-center">{item.title}</CardTitle>
                        <CardDescription className="text-center">{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>Last updated: April 9, 2025</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h3>1. Information We Collect</h3>
                  <p>
                    DharmaSetu collects information that you provide directly to us when you use our services. This
                    includes personal information such as your name, email address, and any other information you choose
                    to provide when using our platform.
                  </p>

                  <h3>2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, to develop new
                    features, and to protect DharmaSetu and our users.
                  </p>

                  <h3>3. Data Security</h3>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>

                  <h3>4. Your Rights</h3>
                  <p>
                    You have the right to access, correct, or delete your personal information. You can also object to
                    the processing of your personal information or request that we restrict certain processing.
                  </p>

                  <h3>5. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@dharmasetu.org.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>Last updated: April 9, 2025</CardDescription>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using DharmaSetu, you agree to be bound by these Terms of Service and all applicable
                    laws and regulations.
                  </p>

                  <h3>2. Use of Services</h3>
                  <p>
                    DharmaSetu provides AI-powered legal tools and community engagement features. Our services are
                    intended to provide information and assistance but do not constitute legal advice.
                  </p>

                  <h3>3. User Accounts</h3>
                  <p>
                    You are responsible for maintaining the confidentiality of your account information and for all
                    activities that occur under your account.
                  </p>

                  <h3>4. Content and Conduct</h3>
                  <p>
                    You agree not to use DharmaSetu for any unlawful purpose or in any way that could damage, disable,
                    or impair the platform. You are solely responsible for all content you post, upload, or otherwise
                    make available through DharmaSetu.
                  </p>

                  <h3>5. Disclaimer of Warranties</h3>
                  <p>
                    DharmaSetu services are provided "as is" without warranties of any kind, either express or implied.
                    We do not guarantee that our services will be error-free or uninterrupted.
                  </p>

                  <h3>6. Limitation of Liability</h3>
                  <p>
                    DharmaSetu shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages resulting from your use of or inability to use our services.
                  </p>

                  <h3>7. Changes to Terms</h3>
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Your continued use of DharmaSetu
                    after such changes constitutes your acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-gray-500">© 2025 DharmaSetu. All rights reserved.</div>
      </footer>
    </div>
  )
}
