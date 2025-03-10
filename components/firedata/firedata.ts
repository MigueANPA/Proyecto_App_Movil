import { firebase_db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, addDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface AirQualityData {
  label: string;
  value: number;
  color: string;
}

interface GasData {
  CO2?: number;
  N2?: number;
  O2?: number;
  timestamp?: any;
}

const handleError = (error: unknown, setError: Dispatch<SetStateAction<string | null>>) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  setError(errorMessage);
  console.error("Fetch error:", error);
};

export const fetchCalidadAire = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCalidadAire: Dispatch<SetStateAction<AirQualityData[]>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  setLoading(true);
  try {
    const q = query(collection(firebase_db, "calidad_a"));
    const querySnapshot = await getDocs(q);
    
    const data: AirQualityData[] = querySnapshot.docs.map(doc => {
      const docData = doc.data();
      
      // Buscar el valor en cualquiera de los posibles campos
      const value = Math.max(0, Math.min(100, 
        docData.calidad !== undefined ? docData.calidad : 
        docData.canlidad !== undefined ? docData.canlidad : 0
      ));
      
      // Buscar la etiqueta en el campo calidadA
      const label = docData.calidadA || "Desconocida";
      
      // Usar el color de la base de datos o asignar uno según la etiqueta
      let color = docData.color;
      
      // Si no hay color definido, asignar uno según la etiqueta
      if (!color) {
        const colorMap: { [key: string]: string } = {
          Buena: "#4CAF50",
          Regular: "#FFC107",
          Mala: "#F44336",
          Laboratorio: "#2196F3"
        };
        
        // Intentar encontrar una coincidencia para la primera palabra de la etiqueta
        const firstWord = label.split(" ")[0];
        color = colorMap[firstWord] || "#ddd";
      }
      
      return {
        label,
        value,
        color
      };
    });
    
    setCalidadAire(data);
  } catch (error) {
    handleError(error, setError);
  } finally {
    setLoading(false);
  }
};

export const fetchTiposGases = async (
  setData: Dispatch<SetStateAction<number[]>>,
  setLabels: Dispatch<SetStateAction<string[]>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  try {
    const q = query(collection(firebase_db, "tipoG"));
    const querySnapshot = await getDocs(q);
    
    const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const gasData = latestDoc?.data() as GasData;
    
    const gases = {
      "CO2": gasData?.CO2 || 0,
      "N2": gasData?.N2 || 0,
      "O2": gasData?.O2 || 0,
    };

    setLabels(Object.keys(gases));
    setData(Object.values(gases));
  } catch (error) {
    handleError(error, setError);
  }
};

export const addNewLaboratorio = async () => {
  const q = query(collection(firebase_db, "calidad_a"));
  const snapshot = await getDocs(q);
  const nextNumber = snapshot.size + 1;
  
  // Usar "calidad" como nombre del campo para nuevos laboratorios
  // para mantener consistencia con los documentos más recientes
  await addDoc(collection(firebase_db, "calidad_a"), {
    calidad: 0,
    calidadA: `Laboratorio ${nextNumber}`,
    color: "#2196F3"
  });
};