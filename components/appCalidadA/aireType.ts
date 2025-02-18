export interface QualityChartProps {
    label: string;
    value: number;
    color: string;
    onPress: (label: string) => void; // Especifica que onPress recibe un string
  }