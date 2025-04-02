import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,TouchableOpacity,ActivityIndicator,Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchTiposGases } from "../firedata/firedata";
import { Ionicons } from "@expo/vector-icons"; 

interface GasMonitoringAppProps {
    onGoBack: () => void;
}

export const GasMonitoringApp: React.FC<GasMonitoringAppProps> = ({
    onGoBack,
}) => {
    const [data, setData] = useState<number[]>([0, 0, 0]);
    const [labels, setLabels] = useState<string[]>(["CO2", "N2", "O2"]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ventiladoresActivos, setVentiladoresActivos] = useState(false);
    const [purificadorActivo, setPurificadorActivo] = useState(false);
    const [alarmasActivas, setAlarmasActivas] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTiposGases(setData, setLabels, setError).finally(() =>
            setLoading(false)
        );
    }, []);

    const handleVentiladores = () => {
        setVentiladoresActivos(!ventiladoresActivos);
        console.log(`Ventiladores ${ventiladoresActivos ? "apagados" : "encendidos"}`);
    };

    const handlePurificador = () => {
        setPurificadorActivo(!purificadorActivo);
        console.log(`Purificador ${purificadorActivo ? "apagado" : "encendido"}`);
    };

    const handleAlarmas = () => {
        setAlarmasActivas(!alarmasActivas);
        console.log(`Alarmas ${alarmasActivas ? "apagadas" : "encendidas"}`);
    };

    const screenWidth = Dimensions.get("window").width;
    const gasColors = ["#e74c3c", "#3498db", "#2ecc71"]; // Rojo, azul, verde

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Monitoreo de Gases</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#62B58F" style={styles.loader} />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: data,
                                color: (opacity = 1) => `rgba(98, 181, 143, ${opacity})`,
                                strokeWidth: 3,
                                stroke: "#62B58F",
                            },
                        ],
                    }}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#f0f8ff",
                        backgroundGradientTo: "#e0f2fe",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#62B58F",
                        },
                    }}
                    bezier
                    style={styles.chart}
                />
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleVentiladores}
                    style={[
                        styles.button,
                        ventiladoresActivos ? styles.buttonActive : styles.buttonInactive,
                    ]}
                >
                    <Ionicons
                        name="fan"
                        size={24}
                        color={ventiladoresActivos ? "white" : "#333"}
                    />
                    <Text style={styles.buttonText}>Ventilar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePurificador}
                    style={[
                        styles.button,
                        purificadorActivo ? styles.buttonActive : styles.buttonInactive,
                    ]}
                >
                    <Ionicons
                        name="leaf"
                        size={24}
                        color={purificadorActivo ? "white" : "#333"}
                    />
                    <Text style={styles.buttonText}>Purificar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleAlarmas}
                    style={[
                        styles.button,
                        alarmasActivas ? styles.buttonActive : styles.buttonInactive,
                    ]}
                >
                    <Ionicons
                        name="notifications"
                        size={24}
                        color={alarmasActivas ? "white" : "#333"}
                    />
                    <Text style={styles.buttonText}>Alarmas</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f8ff", // Un azul claro de fondo
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
        marginTop: 20,
        color: "#333",
    },
    error: {
        color: "red",
        fontSize: 18,
        marginVertical: 20,
    },
    loader: {
        marginVertical: 40,
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
    },
    button: {
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    buttonActive: {
        backgroundColor: "#62B58F", // Verde para activo
    },
    buttonInactive: {
        backgroundColor: "#e0e0e0", // Gris para inactivo
    },
    backButton: {
        backgroundColor: "#ff8042", // Naranja para regresar
        padding: 15,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8
    },
});