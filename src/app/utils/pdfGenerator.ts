import { jsPDF } from "jspdf";
import type { HealthData, PredictionResult } from "../services/predictionService";

export function generatePredictionReport(
  data: HealthData,
  result: PredictionResult
): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Header
  doc.setFillColor(37, 99, 235); // Primary blue
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("Diabetes Risk Assessment Report", pageWidth / 2, 25, {
    align: "center",
  });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  yPosition = 55;

  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition);
  yPosition += 15;

  // Prediction Result Box
  const boxY = yPosition;
  const boxHeight = 35;
  
  // Color based on risk level
  if (result.riskLevel === "High") {
    doc.setFillColor(239, 68, 68); // Red
  } else if (result.riskLevel === "Medium") {
    doc.setFillColor(234, 179, 8); // Yellow
  } else {
    doc.setFillColor(34, 197, 94); // Green
  }
  
  doc.roundedRect(20, boxY, pageWidth - 40, boxHeight, 3, 3, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Prediction Result", pageWidth / 2, boxY + 12, { align: "center" });
  doc.setFontSize(20);
  doc.text(result.prediction, pageWidth / 2, boxY + 25, { align: "center" });
  
  yPosition += boxHeight + 15;
  doc.setTextColor(0, 0, 0);

  // Risk Score and Level
  doc.setFontSize(14);
  doc.text(`Risk Score: ${result.riskScore}%`, 20, yPosition);
  doc.text(`Risk Level: ${result.riskLevel}`, 120, yPosition);
  yPosition += 15;

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Input Parameters Section
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text("Health Parameters", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  
  const parameters = [
    { label: "Pregnancies", value: data.pregnancies },
    { label: "Glucose Level", value: `${data.glucose} mg/dL` },
    { label: "Blood Pressure", value: `${data.bloodPressure} mm Hg` },
    { label: "Skin Thickness", value: `${data.skinThickness} mm` },
    { label: "Insulin", value: `${data.insulin} μU/mL` },
    { label: "BMI", value: data.bmi.toFixed(1) },
    {
      label: "Diabetes Pedigree",
      value: data.diabetesPedigreeFunction.toFixed(3),
    },
    { label: "Age", value: `${data.age} years` },
  ];

  parameters.forEach((param, index) => {
    const xPos = index % 2 === 0 ? 20 : 120;
    const yPos = yPosition + Math.floor(index / 2) * 8;
    doc.text(`${param.label}: ${param.value}`, xPos, yPos);
  });

  yPosition += Math.ceil(parameters.length / 2) * 8 + 10;

  // Risk Factors Section
  if (result.factors.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Key Risk Factors", 20, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    result.factors.slice(0, 5).forEach((factor) => {
      const icon = factor.impact === "negative" ? "⚠" : "✓";
      doc.text(
        `${icon} ${factor.name}: ${factor.value}`,
        25,
        yPosition
      );
      yPosition += 6;
    });
    yPosition += 5;
  }

  // Recommendations Section
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text("Recommendations", 20, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  const recommendations = result.recommendation.split("\n\n");
  const maxWidth = pageWidth - 50;
  
  recommendations.forEach((rec) => {
    const lines = doc.splitTextToSize(rec.trim(), maxWidth);
    lines.forEach((line: string) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 3;
  });

  // Disclaimer
  yPosition += 10;
  if (yPosition > 260) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(20, yPosition, pageWidth - 40, 25, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  const disclaimer =
    "DISCLAIMER: This assessment is for educational purposes only and should not be considered as medical advice. " +
    "Please consult with a qualified healthcare professional for proper diagnosis and treatment.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 50);
  
  disclaimerLines.forEach((line: string, index: number) => {
    doc.text(line, pageWidth / 2, yPosition + 8 + index * 4, {
      align: "center",
    });
  });

  // Save the PDF
  const fileName = `Diabetes_Risk_Report_${new Date()
    .toISOString()
    .split("T")[0]}.pdf`;
  doc.save(fileName);
}
