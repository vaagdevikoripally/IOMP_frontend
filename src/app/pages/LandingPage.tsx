import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { LandingChatBot } from "../components/LandingChatBot";
import {
  Activity,
  Brain,
  Clock,
  LineChart,
  Shield,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-blue-900">
              DiabetesAI
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </a>
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              AI-Powered Health Assessment
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Predict Diabetes Risk{" "}
              <span className="text-blue-600">Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Advanced machine learning technology to assess your diabetes risk
              in seconds. Get personalized health insights and actionable
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
                onClick={() => navigate("/predict")}
              >
                Start Prediction
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10k+</div>
                <div className="text-sm text-gray-600">Assessments</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  &lt;30s
                </div>
                <div className="text-sm text-gray-600">Results Time</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl blur-3xl opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHRlY2hub2xvZ3klMjBkb2N0b3J8ZW58MXx8fHwxNzc0MzI4NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Healthcare professional with technology"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DiabetesAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology meets healthcare expertise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Get your diabetes risk assessment in under 30 seconds with our
                optimized ML algorithms.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Accuracy</h3>
              <p className="text-gray-600">
                Advanced Random Forest model trained on thousands of medical
                records for reliable predictions.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple 8-parameter form with instant results and detailed
                health recommendations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your health insights
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Health Data</h3>
              <p className="text-gray-600">
                Input 8 basic health parameters including glucose, BMI, and age
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our ML model analyzes your data against medical thresholds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed risk assessment with actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Track Your Health Journey
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <LineChart className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">History Tracking</h3>
                    <p className="text-blue-100">
                      View all your past assessments and track changes over
                      time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Instant Reports</h3>
                    <p className="text-blue-100">
                      Download comprehensive PDF reports for your records
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Visual Insights</h3>
                    <p className="text-blue-100">
                      Interactive charts and graphs for better understanding
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="mt-8 bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/predict")}
              >
                Get Started Now
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1685061968192-c73cac2fb57e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFiZXRlcyUyMGJsb29kJTIwc3VnYXIlMjB0ZXN0fGVufDF8fHx8MTc3NDM3NTAwNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Diabetes blood sugar testing"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Check Your Diabetes Risk?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take control of your health today with our free, instant diabetes
              risk assessment.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-12"
              onClick={() => navigate("/predict")}
            >
              Start Free Assessment
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6" />
                <span className="font-bold text-lg">DiabetesAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered diabetes risk prediction for better health outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Diabetes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Health Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2026 DiabetesAI. All rights reserved. This tool is for
              educational purposes only and not a substitute for professional
              medical advice.
            </p>
          </div>
        </div>
      </footer>
      <LandingChatBot />
    </div>
  );
}
