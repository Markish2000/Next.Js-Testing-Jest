// Importa la función fetchData desde el módulo dependency ubicado en la carpeta helpers
import { fetchData } from '../helpers/dependency';

// Define una función llamada processData
export function processData() {
  // Llama a la función fetchData para obtener datos
  const data = fetchData();

  // Procesa los datos obtenidos
  const processedData = `Datos procesados: ${data}`;

  // Retorna los datos procesados
  return processedData;
}
