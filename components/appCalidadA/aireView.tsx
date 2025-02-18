import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, Path, Line, Circle } from "react-native-svg";

// Definir las props del componente
interface QualityChartProps {
  label: string;
  value: number;
  color: string;
  onPress: (label: string) => void;
}

export const QualityChart: React.FC<QualityChartProps> = ({ label, value, color, onPress }) => {
  const { width } = require("react-native").Dimensions.get("window");
  const chartSize = width * 0.76;
  const radius = chartSize / 2;
  const centerX = chartSize / 2;
  const centerY = radius;

  const angle = (value / 100) * 180;
  const radian = (angle * Math.PI) / 180;
  const needleX = centerX + radius * Math.cos(radian - Math.PI);
  const needleY = centerY + radius * Math.sin(radian - Math.PI);

  return (
    <TouchableOpacity onPress={() => onPress(label)} style={styles.chartContainer}>
      <Text style={styles.label}>{label}</Text>
      <Svg width={chartSize} height={radius + 40} viewBox={`-20 -20 ${chartSize + 40} ${radius + 60}`}>
        <Path
          d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${chartSize} ${radius}`}
          fill="none"
          stroke="#ddd"
          strokeWidth={30}
        />
        <Path
          d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${chartSize} ${radius}`}
          fill="none"
          stroke={color}
          strokeWidth={25}
          strokeDasharray={`${(Math.PI * radius * value) / 100} ${Math.PI * radius}`}
          strokeDashoffset={0}
        />
        <Line x1={centerX} y1={centerY} x2={needleX} y2={needleY} stroke="black" strokeWidth={6} />
        <Circle cx={centerX} cy={centerY} r={8} fill="black" />
      </Svg>
      <Text style={styles.value}>{value}%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
});