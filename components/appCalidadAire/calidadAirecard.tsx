import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
                onPress={() => setShowGasMonitoring(true)}
              />
            ))}
          </ScrollView>

          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Laboratorios</Text>
              {airQualityData.map((item, index) => (
                <Text key={index} style={styles.modalText}>
                  {item.label}
                </Text>
              ))}
              <TouchableOpacity onPress={handleAddChart} style={styles.addButton}>
                <Text style={styles.buttonText}>Nuevo Laboratorio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.buttonText}>Cerrar</Text>
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
    backgroundColor:"#E8F5E9"

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
  modalContainer: {
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    margin: "auto",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#62B58F",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  addButton: {
    marginTop: 20,
    padding: 5,
    backgroundColor: "#62B58F",
    borderRadius: 50,
    position: "absolute",
    top: 10,
    right: 10,
  },

  buttonText: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 10
  },
});