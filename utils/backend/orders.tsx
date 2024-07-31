import * as dfd from "danfojs";
import * as XLSX from "xlsx";

/**
 * Convierte un archivo .xlsx en un DataFrame de Danfo.js
 * @param {File} file - El archivo .xlsx a convertir.
 * @returns {Promise<dfd.DataFrame>} - Un DataFrame de Danfo.js con los datos del archivo.
 */
function xlsxToDataFrame(file: File): Promise<dfd.DataFrame> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      // Verificar si event.target es null antes de acceder a event.target.result
      if (event.target === null) {
        reject(new Error("Error de lectura del archivo: event.target es null"));
        return;
      }
      const data = event.target.result;
      if (typeof data === "string") {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const df = new dfd.DataFrame(jsonData);
        resolve(df);
      }
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
}

export { xlsxToDataFrame };