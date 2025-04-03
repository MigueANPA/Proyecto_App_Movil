import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { QualityChart } from "./aireView";
import { GasMonitoringApp } from "./gasMonitoring";
import { fetchCalidadAire, addNewLaboratorio } from "../firedata/firedata";

export const AirQualityCharts: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showGasMonitoring, setShowGasMonitoring] = useState(false);
  const [airQualityData, setAirQualityData] = useState<AirQualityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalidadAire(setLoading, setAirQualityData, setError);
  }, []);

  const handleAddChart = async () => {
    await addNewLaboratorio();
    fetchCalidadAire(setLoading, setAirQualityData, setError);
    setModalVisible(false);
  };

  return (
    <View style={styles.background}>
      {showGasMonitoring ? (
        <GasMonitoringApp onGoBack={() => setShowGasMonitoring(false)} />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
              <Ionicons name="list" size={35} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {airQualityData.map((item, index) => (
              <QualityChart
                key={index}
                value={item.value}
                label={item.label}
                color={item.color}
                nombre={item.nombre || `Laboratorio ${index + 1}`} // Usar nombre o fallback
                onPress={() => setShowGasMonitoring(true)}
              />
            ))}
          </ScrollView>

          <Modal 
            isVisible={isModalVisible}
            backdropOpacity={0.7}
            animationIn="slideInUp"
            animationOut="slideOutDown"
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Laboratorios</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)} 
                  style={styles.closeModalButton}
                >
                  <Ionicons name="close-circle" size={28} color="#666" />
                </TouchableOpacity>
              </View>
              
              {loading ? (
                <Text style={styles.loadingText}>Cargando...</Text>
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <View style={styles.labsList}>
                  {airQualityData.length === 0 ? (
                    <Text style={styles.noDataText}>No hay laboratorios disponibles</Text>
                  ) : (
                    airQualityData.map((item, index) => (
                      <View key={index} style={styles.labItem}>
                        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                        <Text style={styles.labName}>
                          {item.nombre || `Laboratorio ${index + 1}`}
                        </Text>
                        <Text style={styles.labValue}>{item.value}%</Text>
                      </View>
                    ))
                  )}
                </View>
              )}
              
              <TouchableOpacity onPress={handleAddChart} style={styles.addButton}>
                <Text style={styles.addButtonText}>Nuevo Laboratorio</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#E8F5E9"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  iconButton: {
    padding: 10,
    position: "absolute",
    top: 25,
    right: 10,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeModalButton: {
    padding: 5,
  },
  labsList: {
    marginBottom: 20,
    maxHeight: 300,
  },
  labItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  labName: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  labValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize:16,
    color: "#e53935",
    padding: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    padding: 20,
  },
  addButton: {
    backgroundColor: "#35e3ac",
    borderRadius: 25,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});