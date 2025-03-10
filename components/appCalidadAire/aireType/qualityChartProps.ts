export interface QualityChartProps {
    label: string;
    value: number;
    color: string;
    onPress: (label: string) => void;
  }