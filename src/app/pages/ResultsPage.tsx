import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Download,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { toast } from "sonner";
import type { HealthData, PredictionResult } from "../services/predictionService";
import { generatePredictionReport } from "../utils/pdfGenerator";

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, result } = (location.state as {
    data: HealthData;
    result: PredictionResult;
  }) || {};

  useEffect(() => {
    if (!data || !result) {
      toast.error("No prediction data found. Please complete the form first.");
      navigate("/predict");
    }
  }, [data, result, navigate]);

  if (!data || !result) {
    return null;
  }

  const handleDownloadReport = () => {
    try {
      generatePredictionReport(data, result);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    }
  };

  const getRiskColor = () => {
    switch (result.riskLevel) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = () => {
    switch (result.riskLevel) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case "Low":
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case "Medium":
        return <AlertCircle className="w-16 h-16 text-yellow-600" />;
      case "High":
        return <AlertCircle className="w-16 h-16 text-red-600" />;
      default:
        return <Activity className="w-16 h-16 text-gray-600" />;
    }
  };

  // Data for radial chart
  const radialData = [
    {
      name: "Risk Score",
      value: result.riskScore,
      fill: result.riskLevel === "Low" ? "#22C55E" : result.riskLevel === "Medium" ? "#EAB308" : "#EF4444",
    },
  ];

  // Data for bar chart (parameters)
  const parameterData = [
    { name: "Glucose", value: data.glucose, normal: 100 },
    { name: "BP", value: data.bloodPressure, normal: 80 },
    { name: "BMI", value: data.bmi, normal: 22 },
    { name: "Insulin", value: data.insulin / 10, normal: 10 }, // Scaled down for visualization
    { name: "Age", value: data.age, normal: 30 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-blue-900">DiabetesAI</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              View Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Main Result Card */}
        <Card className="p-8 mb-8 shadow-xl border-2">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Diabetes Risk Assessment
            </h1>
            <p className="text-gray-600">Based on your health parameters</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Risk Score Visual */}
            <div className="flex flex-col items-center">
              <div className="mb-4">{getRiskIcon()}</div>
              <div
                className={`text-5xl font-bold ${getRiskColor()} mb-2`}
              >
                {result.prediction}
              </div>
              <div className="text-2xl font-semibold text-gray-600 mb-4">
                Risk Level: {result.riskLevel}
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Risk Score</span>
                  <span className="font-bold">{result.riskScore}%</span>
                </div>
                <Progress
                  value={result.riskScore}
                  className="h-4"
                  indicatorClassName={getProgressColor()}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low (0-30)</span>
                  <span>Medium (30-70)</span>
                  <span>High (70-100)</span>
                </div>
              </div>
            </div>

            {/* Right: Radial Chart */}
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={40}
                  data={radialData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    label={{
                      position: "center",
                      fill: "#1F2937",
                      fontSize: 32,
                      fontWeight: "bold",
                      formatter: (value: number) => `${value}%`,
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleDownloadReport}
            >
              <Download className="mr-2 w-5 h-5" />
              Download PDF Report
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/predict")}
            >
              Take Another Test
            </Button>
          </div>
        </Card>

        {/* Parameter Comparison Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Your Health Parameters
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={parameterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Your Value" fill="#2563EB" />
              <Bar dataKey="normal" name="Normal Range" fill="#94A3B8" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4 text-center">
            * Values are scaled for visualization purposes
          </p>
        </Card>

        {/* Risk Factors */}
        {result.factors.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Risk Factors
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {result.factors.map((factor, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    factor.impact === "negative"
                      ? "bg-red-50 border-red-200"
                      : factor.impact === "positive"
                      ? "bg-green-50 border-green-200"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {factor.name}
                    </span>
                    <span
                      className={`text-2xl ${
                        factor.impact === "negative"
                          ? "text-red-600"
                          : factor.impact === "positive"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {factor.impact === "negative" ? "⚠️" : factor.impact === "positive" ? "✓" : "•"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Value: {typeof factor.value === "number" && factor.value % 1 !== 0
                      ? factor.value.toFixed(2)
                      : factor.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Personalized Recommendations
          </h2>
          <div className="prose max-w-none">
            {result.recommendation.split("\n\n").map((rec, index) => (
              <p key={index} className="text-gray-700 mb-3">
                {rec}
              </p>
            ))}
          </div>
        </Card>

        {/* Detailed Parameters */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Input Parameters
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Pregnancies:</span>
              <span className="text-gray-900">{data.pregnancies}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Glucose:</span>
              <span className="text-gray-900">{data.glucose} mg/dL</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">
                Blood Pressure:
              </span>
              <span className="text-gray-900">{data.bloodPressure} mm Hg</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">
                Skin Thickness:
              </span>
              <span className="text-gray-900">{data.skinThickness} mm</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Insulin:</span>
              <span className="text-gray-900">{data.insulin} μU/mL</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">BMI:</span>
              <span className="text-gray-900">{data.bmi.toFixed(1)}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">
                Diabetes Pedigree:
              </span>
              <span className="text-gray-900">
                {data.diabetesPedigreeFunction.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Age:</span>
              <span className="text-gray-900">{data.age} years</span>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <div className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-2 text-lg">
            ⚕️ Important Medical Disclaimer
          </h3>
          <p className="text-yellow-800">
            This AI-powered assessment is designed for educational and
            informational purposes only. It does not constitute medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions you may have
            regarding a medical condition. Never disregard professional medical
            advice or delay in seeking it because of something you have read or
            received from this tool.
          </p>
        </div>
      </div>
    </div>
  );
}
