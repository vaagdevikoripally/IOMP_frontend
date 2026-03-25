import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
// import { DashboardChatBot } from "../components/DashboardChatBot";
import {
  Activity,
  ArrowLeft,
  Calendar,
  FileText,
  PlusCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getPredictionHistory } from "../services/predictionService";
import { format } from "date-fns";

export function DashboardPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(getPredictionHistory());

  useEffect(() => {
    // Refresh history when component mounts
    setHistory(getPredictionHistory());
  }, []);

  // Prepare chart data
  const timelineData = history
    .slice(0, 10)
    .reverse()
    .map((record, index) => ({
      date: format(new Date(record.date), "MM/dd"),
      riskScore: record.result.riskScore,
      glucose: record.data.glucose,
      bmi: record.data.bmi,
    }));

  // Risk level distribution
  const riskDistribution = [
    {
      name: "Low Risk",
      value: history.filter((r) => r.result.riskLevel === "Low").length,
      color: "#22C55E",
    },
    {
      name: "Medium Risk",
      value: history.filter((r) => r.result.riskLevel === "Medium").length,
      color: "#EAB308",
    },
    {
      name: "High Risk",
      value: history.filter((r) => r.result.riskLevel === "High").length,
      color: "#EF4444",
    },
  ].filter((item) => item.value > 0);

  // Stats
  const totalAssessments = history.length;
  const averageRiskScore =
    totalAssessments > 0
      ? Math.round(
          history.reduce((sum, record) => sum + record.result.riskScore, 0) /
            totalAssessments
        )
      : 0;
  const latestRiskScore = totalAssessments > 0 ? history[0].result.riskScore : 0;
  const trend =
    totalAssessments > 1
      ? latestRiskScore - history[1].result.riskScore
      : 0;

  const handleViewResult = (record: any) => {
    navigate("/results", {
      state: { data: record.data, result: record.result },
    });
  };

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
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/predict")}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Health Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your diabetes risk assessments over time
          </p>
        </div>

        {totalAssessments === 0 ? (
          // Empty State
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Assessments Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Take your first diabetes risk assessment to start tracking your
              health.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/predict")}
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Start First Assessment
            </Button>
          </Card>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Assessments</span>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {totalAssessments}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Average Risk</span>
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {averageRiskScore}%
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Latest Risk</span>
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {latestRiskScore}%
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Trend</span>
                  {trend < 0 ? (
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  ) : trend > 0 ? (
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <Activity className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div
                  className={`text-3xl font-bold ${
                    trend < 0
                      ? "text-green-600"
                      : trend > 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Risk Score Timeline */}
              <Card className="p-6 md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Risk Score Timeline
                </h2>
                {timelineData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="riskScore"
                        stroke="#2563EB"
                        strokeWidth={3}
                        name="Risk Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    Not enough data
                  </div>
                )}
              </Card>

              {/* Risk Level Distribution */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Risk Distribution
                </h2>
                {riskDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          value,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="white"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontWeight="bold"
                            >
                              {value}
                            </text>
                          );
                        }}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-500">
                    No data
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {riskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Assessment History */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Assessment History
              </h2>
              <div className="space-y-4">
                {history.slice(0, 10).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          record.result.riskLevel === "Low"
                            ? "bg-green-500"
                            : record.result.riskLevel === "Medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {record.result.prediction} -{" "}
                          {record.result.riskLevel} Risk
                        </div>
                        <div className="text-sm text-gray-600">
                          {format(
                            new Date(record.date),
                            "MMM dd, yyyy 'at' h:mm a"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {record.result.riskScore}%
                        </div>
                        <div className="text-xs text-gray-600">Risk Score</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewResult(record)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {history.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Showing 10 of {history.length} assessments
                </div>
              )}
            </Card>

            {/* Health Metrics Comparison */}
            {timelineData.length > 1 && (
              <Card className="p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Key Health Metrics Over Time
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="glucose"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Glucose (mg/dL)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bmi"
                      stroke="#22C55E"
                      strokeWidth={2}
                      name="BMI"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
