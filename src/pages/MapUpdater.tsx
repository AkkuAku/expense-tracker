import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { Expense } from "../types";

function MapUpdater({ expense }: { expense: Expense | null }) {
  const map = useMap();

  useEffect(() => {
    if (expense?.location) {
      map.flyTo([expense.location.lat, expense.location.lon], 16, {
        animate: true,
        duration: 1.5, // секунда-полторы на плавный перелёт
      });
    }
  }, [expense, map]);

  return null;
}

export default MapUpdater;
