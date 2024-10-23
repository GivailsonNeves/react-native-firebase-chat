import { theme } from "@/constants/Theme";
import { useTheme } from "react-native-paper";

export type AppTheme = typeof theme;

export function useAppTheme() {  
  return useTheme<AppTheme>(theme);
}