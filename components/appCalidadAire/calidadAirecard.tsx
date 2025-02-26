import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { QualityChart } from "./aireView";
import { GasMonitoringApp } from "./gasMonitoring"; // Importar el nuevo componente

const airQualityData = [
  { label: "Laboratorio 1", value: 80, color: "#62B58F" },
  { label: "Laboratorio 2", value: 50, color: "#FFC533" },
  { label: "Laboratorio 3", value: 20, color: "#F2726F" },
  { label: "Laboratorio 4", value: 10, color: "#E15A26" },
];

export const AirQualityCharts = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showGasMonitoring, setShowGasMonitoring] = useState(false); // Estado para controlar qué componente mostrar

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddChart = () => {
    // Aquí puedes agregar la lógica para agregar una nueva gráfica
    console.log("Agregar nueva gráfica");
  };

  const handleChartPress = (label: string) => {
    // Función que se ejecuta al presionar una gráfica
    console.log("Gráfica seleccionada", `Has seleccionado la gráfica: ${label}`);
    setShowGasMonitoring(true); // Mostrar GasMonitoringApp
  };

  const handleGoBack = () => {
    setShowGasMonitoring(false); // Volver a QualityChart
  };

  return (
    <ImageBackground
      source={{ uri: "https://www.shutterstock.com/image-photo/good-air-quality-clean-outdoor-600nw-2421635111.jpg" }}
      style={styles.background}
    >
      {showGasMonitoring ? (
        <GasMonitoringApp onGoBack={handleGoBack} />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
              <Ionicons name="list" size={35} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {airQualityData.map(({ label, value, color }, index) => (
              <QualityChart
                key={index}
                label={label}
                value={value}
                color={color}
                onPress={() => handleChartPress(label)} // Pasar la función onPress
              />
            ))}
          </ScrollView>

          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Agregar Labaratorio</Text>
              <View style={styles.modalContainer}>
              {airQualityData.map(({ label }, index) => (
                <Text key={index} style={styles.modalText}>
                  {label}
                </Text>
              ))}
              </View>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddChart} style={styles.closeButton2}>
                <Ionicons name="add" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
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
    borderRadius: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  modalContainer:{
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    margin: "auto"
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
  closeButton2: {
    marginTop: 20,
    padding: 5,
    backgroundColor: "#62B58F",
    borderRadius: 100,
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});