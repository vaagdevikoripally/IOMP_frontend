import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Activity, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  predictDiabetesRisk,
  savePredictionRecord,
  type HealthData,
} from "../services/predictionService";

export function PredictionForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HealthData>();

  // const onSubmit = async (data: HealthData) => {
  //   setIsLoading(true);
    
  //   // Simulate API call delay for realistic UX
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   try {
  //     // Get prediction result
  //     const result = predictDiabetesRisk(data);

  //     // Save to history
  //     savePredictionRecord(data, result);

  //     // Navigate to results page with data
  //     navigate("/results", {
  //       state: { data, result },
  //     });

  //     toast.success("Analysis complete!");
  //   } catch (error) {
  //     toast.error("An error occurred during prediction. Please try again.");
  //     setIsLoading(false);
  //   }
  // };
  const onSubmit = async (data: HealthData) => {
  try {
    setIsLoading(true);

    const result = await predictDiabetesRisk(data);

    console.log("RESULT:", result);

    savePredictionRecord(data, result);

    navigate("/results", {
      state: { data, result },
    });

    toast.success("Analysis complete!");
  } catch (error) {
    console.error(error);
    toast.error("An error occurred during prediction.");
  } finally {
    setIsLoading(false); // ✅ ALWAYS RESET
  }
};

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
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diabetes Risk Assessment
          </h1>
          <p className="text-xl text-gray-600">
            Enter your health parameters for instant AI-powered analysis
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Pregnancies */}
            <div className="space-y-2">
              <Label htmlFor="pregnancies">
                Number of Pregnancies
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="pregnancies"
                type="number"
                step="1"
                min="0"
                max="20"
                placeholder="e.g., 0"
                {...register("pregnancies", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  max: { value: 20, message: "Must be 20 or less" },
                  valueAsNumber: true,
                })}
                className={errors.pregnancies ? "border-red-500" : ""}
              />
              {errors.pregnancies && (
                <p className="text-sm text-red-500">
                  {errors.pregnancies.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                For males, enter 0
              </p>
            </div>

            {/* Glucose */}
            <div className="space-y-2">
              <Label htmlFor="glucose">
                Plasma Glucose Concentration (mg/dL)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="glucose"
                type="number"
                step="1"
                min="0"
                max="300"
                placeholder="e.g., 120"
                {...register("glucose", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be greater than 0" },
                  max: { value: 300, message: "Must be 300 or less" },
                  valueAsNumber: true,
                })}
                className={errors.glucose ? "border-red-500" : ""}
              />
              {errors.glucose && (
                <p className="text-sm text-red-500">{errors.glucose.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Normal fasting: 70-100 mg/dL
              </p>
            </div>

            {/* Blood Pressure */}
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">
                Diastolic Blood Pressure (mm Hg)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="bloodPressure"
                type="number"
                step="1"
                min="0"
                max="200"
                placeholder="e.g., 80"
                {...register("bloodPressure", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be greater than 0" },
                  max: { value: 200, message: "Must be 200 or less" },
                  valueAsNumber: true,
                })}
                className={errors.bloodPressure ? "border-red-500" : ""}
              />
              {errors.bloodPressure && (
                <p className="text-sm text-red-500">
                  {errors.bloodPressure.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Normal range: 60-80 mm Hg
              </p>
            </div>

            {/* Skin Thickness */}
            <div className="space-y-2">
              <Label htmlFor="skinThickness">
                Triceps Skin Fold Thickness (mm)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="skinThickness"
                type="number"
                step="1"
                min="0"
                max="100"
                placeholder="e.g., 20"
                {...register("skinThickness", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  max: { value: 100, message: "Must be 100 or less" },
                  valueAsNumber: true,
                })}
                className={errors.skinThickness ? "border-red-500" : ""}
              />
              {errors.skinThickness && (
                <p className="text-sm text-red-500">
                  {errors.skinThickness.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Typical range: 10-50 mm
              </p>
            </div>

            {/* Insulin */}
            <div className="space-y-2">
              <Label htmlFor="insulin">
                2-Hour Serum Insulin (μU/mL)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="insulin"
                type="number"
                step="1"
                min="0"
                max="900"
                placeholder="e.g., 80"
                {...register("insulin", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  max: { value: 900, message: "Must be 900 or less" },
                  valueAsNumber: true,
                })}
                className={errors.insulin ? "border-red-500" : ""}
              />
              {errors.insulin && (
                <p className="text-sm text-red-500">{errors.insulin.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Normal range: 16-166 μU/mL
              </p>
            </div>

            {/* BMI */}
            <div className="space-y-2">
              <Label htmlFor="bmi">
                Body Mass Index (BMI)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                min="10"
                max="70"
                placeholder="e.g., 25.5"
                {...register("bmi", {
                  required: "This field is required",
                  min: { value: 10, message: "Must be 10 or greater" },
                  max: { value: 70, message: "Must be 70 or less" },
                  valueAsNumber: true,
                })}
                className={errors.bmi ? "border-red-500" : ""}
              />
              {errors.bmi && (
                <p className="text-sm text-red-500">{errors.bmi.message}</p>
              )}
              <p className="text-sm text-gray-500">
                Normal range: 18.5-24.9 | Calculate: weight(kg) / height(m)²
              </p>
            </div>

            {/* Diabetes Pedigree Function */}
            <div className="space-y-2">
              <Label htmlFor="diabetesPedigreeFunction">
                Diabetes Pedigree Function
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="diabetesPedigreeFunction"
                type="number"
                step="0.001"
                min="0"
                max="2.5"
                placeholder="e.g., 0.5"
                {...register("diabetesPedigreeFunction", {
                  required: "This field is required",
                  min: { value: 0, message: "Must be 0 or greater" },
                  max: { value: 2.5, message: "Must be 2.5 or less" },
                  valueAsNumber: true,
                })}
                className={
                  errors.diabetesPedigreeFunction ? "border-red-500" : ""
                }
              />
              {errors.diabetesPedigreeFunction && (
                <p className="text-sm text-red-500">
                  {errors.diabetesPedigreeFunction.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Genetic likelihood score (higher = stronger family history)
              </p>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">
                Age (years)
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                step="1"
                min="1"
                max="120"
                placeholder="e.g., 35"
                {...register("age", {
                  required: "This field is required",
                  min: { value: 1, message: "Must be 1 or greater" },
                  max: { value: 120, message: "Must be 120 or less" },
                  valueAsNumber: true,
                })}
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing Your Data...
                  </>
                ) : (
                  "Get Risk Assessment"
                )}
              </Button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Disclaimer:</strong> This tool provides an AI-based risk
              assessment for educational purposes only and is not a substitute
              for professional medical advice, diagnosis, or treatment. Always
              consult a qualified healthcare provider for medical concerns.
            </p>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">📊 Data Privacy</h3>
            <p className="text-sm text-blue-800">
              Your data is processed locally and stored securely in your
              browser.
            </p>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-bold text-green-900 mb-2">⚡ Instant Results</h3>
            <p className="text-sm text-green-800">
              Get your risk assessment in seconds with detailed
              recommendations.
            </p>
          </Card>
          <Card className="p-4 bg-purple-50 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">🤖 AI-Powered</h3>
            <p className="text-sm text-purple-800">
              Advanced ML model trained on medical datasets for accuracy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
