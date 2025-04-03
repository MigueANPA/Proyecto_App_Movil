import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import { Svg, Path, Line, Circle } from "react-native-svg";

interface QualityChartProps {
  nombre?: string;
  value: number;
  label: string;
  color: string;
  onPress?: () => void;
}

export const QualityChart: React.FC<QualityChartProps> = ({ nombre, value, label, color, onPress }) => {
  const { width } = Dimensions.get("window");
  const chartSize = width * 0.76;
  const radius = chartSize / 2;
  const centerX = chartSize / 2;
  const centerY = radius;

  const angle = (value / 100) * 180;
  const radian = (angle * Math.PI) / 180;
  const needleX = centerX + radius * Math.cos(radian - Math.PI);
  const needleY = centerY + radius * Math.sin(radian - Math.PI);

  return (
    <TouchableOpacity style={styles.chartContainer} onPress={onPress}>
      {/* Mostramos el nombre en la parte superior si existe */}
      {nombre && (
        <View style={styles.nombreContainer}>
          <Text style={styles.nombreText}>{nombre}</Text>
        </View>
      )}
      
      <Text style={styles.value}>{value}%</Text>
      
      <Svg width={chartSize} height={radius + 40} viewBox={`-20 -20 ${chartSize + 40} ${radius + 60}`}>
        <Path d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${chartSize} ${radius}`} fill="none" stroke="#ddd" strokeWidth={30} />
        <Path d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${chartSize} ${radius}`} fill="none" stroke={color} strokeWidth={25} strokeDasharray={`${(Math.PI * radius * value) / 100} ${Math.PI * radius}`} />
        <Line x1={centerX} y1={centerY} x2={needleX} y2={needleY} stroke="black" strokeWidth={6} />
        <Circle cx={centerX} cy={centerY} r={8} fill="black" />
      </Svg>
      
      <View style={styles.qualityContainer}>
        <Text style={[styles.qualityText, { color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffffff",
  },
  value: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  qualityContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  qualityText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  nombreContainer: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  nombreText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});