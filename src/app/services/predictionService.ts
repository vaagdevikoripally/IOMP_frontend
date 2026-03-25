// export interface HealthData {
//   pregnancies: number;
//   glucose: number;
//   bloodPressure: number;
//   skinThickness: number;
//   insulin: number;
//   bmi: number;
//   diabetesPedigreeFunction: number;
//   age: number;
// }

// export interface PredictionResult {
//   prediction: "Diabetic" | "Non-Diabetic";
//   riskScore: number; // 0-100
//   riskLevel: "Low" | "Medium" | "High";
//   recommendation: string;
//   factors: {
//     name: string;
//     value: number;
//     impact: "positive" | "negative" | "neutral";
//   }[];
// }

// /**
//  * Simulates a machine learning model prediction
//  * Based on medical research thresholds for diabetes risk factors
//  * 
//  * In production, this would call a FastAPI backend endpoint:
//  * POST /api/predict with the health data
//  */
// export function predictDiabetesRisk(data: HealthData): PredictionResult {
//   // Risk scoring system based on medical thresholds
//   let riskScore = 0;
//   const factors: PredictionResult["factors"] = [];

//   // Glucose (most important factor)
//   // Normal: <100, Prediabetes: 100-125, Diabetes: >125
//   if (data.glucose >= 126) {
//     riskScore += 35;
//     factors.push({
//       name: "Glucose Level",
//       value: data.glucose,
//       impact: "negative",
//     });
//   } else if (data.glucose >= 100) {
//     riskScore += 20;
//     factors.push({
//       name: "Glucose Level",
//       value: data.glucose,
//       impact: "negative",
//     });
//   } else {
//     factors.push({
//       name: "Glucose Level",
//       value: data.glucose,
//       impact: "positive",
//     });
//   }

//   // BMI
//   // Normal: 18.5-24.9, Overweight: 25-29.9, Obese: >30
//   if (data.bmi >= 30) {
//     riskScore += 20;
//     factors.push({
//       name: "BMI",
//       value: data.bmi,
//       impact: "negative",
//     });
//   } else if (data.bmi >= 25) {
//     riskScore += 10;
//     factors.push({
//       name: "BMI",
//       value: data.bmi,
//       impact: "negative",
//     });
//   } else {
//     factors.push({
//       name: "BMI",
//       value: data.bmi,
//       impact: "positive",
//     });
//   }

//   // Age
//   // Risk increases with age
//   if (data.age >= 45) {
//     riskScore += 15;
//     factors.push({
//       name: "Age",
//       value: data.age,
//       impact: "negative",
//     });
//   } else if (data.age >= 35) {
//     riskScore += 8;
//     factors.push({
//       name: "Age",
//       value: data.age,
//       impact: "neutral",
//     });
//   }

//   // Blood Pressure
//   // Normal: <120, Elevated: 120-129, High: >130
//   if (data.bloodPressure >= 130) {
//     riskScore += 10;
//     factors.push({
//       name: "Blood Pressure",
//       value: data.bloodPressure,
//       impact: "negative",
//     });
//   } else if (data.bloodPressure >= 120) {
//     riskScore += 5;
//   }

//   // Insulin
//   // Normal fasting: <25, High: >25
//   if (data.insulin > 166) {
//     riskScore += 10;
//     factors.push({
//       name: "Insulin",
//       value: data.insulin,
//       impact: "negative",
//     });
//   }

//   // Diabetes Pedigree Function (genetic factor)
//   // Higher values indicate stronger family history
//   if (data.diabetesPedigreeFunction > 0.5) {
//     riskScore += 15;
//     factors.push({
//       name: "Family History",
//       value: data.diabetesPedigreeFunction,
//       impact: "negative",
//     });
//   } else if (data.diabetesPedigreeFunction > 0.3) {
//     riskScore += 8;
//   }

//   // Pregnancies (for women)
//   if (data.pregnancies > 0) {
//     if (data.pregnancies >= 4) {
//       riskScore += 8;
//     } else if (data.pregnancies >= 2) {
//       riskScore += 4;
//     }
//   }

//   // Add some randomness to simulate model uncertainty (±5%)
//   const randomFactor = (Math.random() - 0.5) * 10;
//   riskScore = Math.max(0, Math.min(100, riskScore + randomFactor));

//   // Determine risk level
//   let riskLevel: "Low" | "Medium" | "High";
//   if (riskScore < 30) {
//     riskLevel = "Low";
//   } else if (riskScore < 70) {
//     riskLevel = "Medium";
//   } else {
//     riskLevel = "High";
//   }

//   // Determine prediction
//   const prediction: "Diabetic" | "Non-Diabetic" =
//     riskScore >= 60 ? "Diabetic" : "Non-Diabetic";

//   // Generate personalized recommendation
//   const recommendation = generateRecommendation(data, riskLevel, factors);

//   return {
//     prediction,
//     riskScore: Math.round(riskScore),
//     riskLevel,
//     recommendation,
//     factors,
//   };
// }

// function generateRecommendation(
//   data: HealthData,
//   riskLevel: "Low" | "Medium" | "High",
//   factors: PredictionResult["factors"]
// ): string {
//   const recommendations: string[] = [];

//   if (riskLevel === "High") {
//     recommendations.push(
//       "⚠️ Your risk assessment indicates high diabetes risk. We strongly recommend consulting with a healthcare provider immediately for comprehensive testing and evaluation."
//     );
//   } else if (riskLevel === "Medium") {
//     recommendations.push(
//       "⚡ Your risk assessment shows moderate diabetes risk. Consider scheduling a consultation with your healthcare provider for further evaluation."
//     );
//   } else {
//     recommendations.push(
//       "✅ Your risk assessment indicates low diabetes risk. Continue maintaining healthy lifestyle habits."
//     );
//   }

//   // Specific recommendations based on factors
//   if (data.glucose >= 100) {
//     recommendations.push(
//       "🩸 Monitor your blood glucose levels regularly and reduce sugar intake."
//     );
//   }

//   if (data.bmi >= 25) {
//     recommendations.push(
//       "🏃 Consider a balanced diet and regular physical activity to achieve a healthy BMI (18.5-24.9)."
//     );
//   }

//   if (data.bloodPressure >= 120) {
//     recommendations.push(
//       "💓 Monitor blood pressure regularly and reduce sodium intake."
//     );
//   }

//   if (data.diabetesPedigreeFunction > 0.3) {
//     recommendations.push(
//       "👨‍👩‍👧 Family history indicates increased risk. Regular health screenings are recommended."
//     );
//   }

//   // General advice
//   recommendations.push(
//     "🥗 Maintain a balanced diet rich in vegetables, whole grains, and lean proteins."
//   );
//   recommendations.push("💧 Stay hydrated and exercise at least 30 minutes daily.");

//   return recommendations.join("\n\n");
// }

// /**
//  * Stores prediction result in local storage
//  * In production, this would call: POST /api/save-record
//  */
// export function savePredictionRecord(
//   data: HealthData,
//   result: PredictionResult
// ): void {
//   const records = getPredictionHistory();
//   const newRecord = {
//     id: Date.now().toString(),
//     date: new Date().toISOString(),
//     data,
//     result,
//   };
//   records.unshift(newRecord);
//   // Keep only last 50 records
//   const limitedRecords = records.slice(0, 50);
//   localStorage.setItem("diabetes-predictions", JSON.stringify(limitedRecords));
// }

// /**
//  * Retrieves prediction history from local storage
//  * In production, this would call: GET /api/history
//  */
// export function getPredictionHistory(): Array<{
//   id: string;
//   date: string;
//   data: HealthData;
//   result: PredictionResult;
// }> {
//   const stored = localStorage.getItem("diabetes-predictions");
//   return stored ? JSON.parse(stored) : [];
// }
export interface HealthData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface PredictionResult {
  prediction: "Diabetic" | "Non-Diabetic";
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  recommendation: string;
  factors: {
    name: string;
    value: number;
    impact: "positive" | "negative" | "neutral";
  }[];
}

/**
 * 🔥 REAL API CALL (FastAPI Backend)
 */
export async function predictDiabetesRisk(
  data: HealthData
): Promise<PredictionResult> {
  const API = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  pregnancies: Number(data.pregnancies),
  glucose: Number(data.glucose),
  blood_pressure: Number(data.bloodPressure),
  skin_thickness: Number(data.skinThickness),
  insulin: Number(data.insulin),
  bmi: Number(data.bmi),
  diabetes_pedigree: Number(data.diabetesPedigreeFunction),
  age: Number(data.age),
}),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const result = await response.json();

  // ✅ Map backend → frontend
  const prediction = result.prediction as "Diabetic" | "Non-Diabetic";
  const riskScore = result.risk_score as number;
  const riskLevel = result.risk_level as "Low" | "Medium" | "High";

  // ✅ Generate recommendation (based on backend result)
  let recommendation = "";
  if (riskLevel === "High") {
    recommendation =
      "⚠️ High risk detected. Please consult a doctor immediately.";
  } else if (riskLevel === "Medium") {
    recommendation =
      "⚡ Moderate risk. Consider medical advice and lifestyle changes.";
  } else {
    recommendation =
      "✅ Low risk. Maintain a healthy lifestyle and regular checkups.";
  }

  return {
    prediction,
    riskScore,
    riskLevel,
    recommendation,
    factors: [], // can enhance later
  };
}

/**
 * 💾 Save result locally (for dashboard)
 */
export function savePredictionRecord(
  data: HealthData,
  result: PredictionResult
): void {
  const records = getPredictionHistory();

  const newRecord = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    data,
    result,
  };

  records.unshift(newRecord);

  const limitedRecords = records.slice(0, 50);

  localStorage.setItem(
    "diabetes-predictions",
    JSON.stringify(limitedRecords)
  );
}

/**
 * 📊 Get history (used in dashboard)
 */
export function getPredictionHistory(): Array<{
  id: string;
  date: string;
  data: HealthData;
  result: PredictionResult;
}> {
  const stored = localStorage.getItem("diabetes-predictions");
  return stored ? JSON.parse(stored) : [];
}