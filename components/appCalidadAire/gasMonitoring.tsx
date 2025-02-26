import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit"; // Cambia Recharts por esta librería

interface GasMonitoringAppProps {
  onGoBack: () => void;
}

export const GasMonitoringApp: React.FC<GasMonitoringAppProps> = ({ onGoBack }) => {
  const [data, setData] = useState([0, 0, 0, 0]); // Datos numéricos para las gráficas

  // Actualizar datos cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setData(data.map(() => Math.floor(Math.random() * 100)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Funciones para botones (igual que antes)
  const handleVentiladores = () => console.log("Ventiladores encendidos");
  const handlePurificador = () => console.log("Purificador de aire encendido");
  const handleAlarmas = () => console.log("Alarmas encendidas");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoreo de Gases</Text>

      {/* Gráfica de Líneas Nativa */}
      <LineChart
        data={{
          labels: ["Gas A", "Gas B", "Gas C", "Gas D"],
          datasets: [{ data }],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Botones de Control (igual que antes) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleVentiladores} style={styles.button}>
          <Text style={styles.buttonText}>Ventilar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePurificador} style={styles.button}>
          <Text style={styles.buttonText}>PurificarA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAlarmas} style={styles.button}>
          <Text style={styles.buttonText}>Alarmas</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para regresar */}
      <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos (ajusta según necesidades)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  chart: {
    marginVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  chartContainer: {
    height: 300,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#62B58F",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#ff8042",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // ... (otros estilos igual que antes)
});