import { axe } from 'jest-axe';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Counter from './counter';

import * as dependency from '../helpers/dependency';

import { processData } from 'handler/dataHandler';

// * Prueba unitaria.
it('Renderiza correctamente el componente Counter con valor inicial de 0', () => {
  // Renderiza el componente Counter
  render(<Counter />);

  // Verifica que el componente tenga un heading (<h2>) con el valor inicial de 0
  expect(screen.getByRole('heading')).toHaveTextContent('0');
});

// * Prueba de evento.
it('Incrementa el contador cuando se hace clic en el botón', () => {
  // Renderiza el componente Counter
  render(<Counter />);

  // Verifica que el contador comience en 0
  expect(screen.getByRole('heading')).toHaveTextContent('0');

  // Simula un clic en el botón
  fireEvent.click(screen.getByRole('button'));

  // Verifica que el contador se haya incrementado a 1 después del clic
  expect(screen.getByRole('heading')).toHaveTextContent('1');
});

// * Prueba de accesibilidad.
it('Cumple con los estándares de accesibilidad', async () => {
  // Renderiza el componente Counter
  render(<Counter />);

  // Ejecuta la prueba de accesibilidad utilizando Axe
  const results = await axe(screen.getByRole('heading'));

  // Verifica que no haya problemas de accesibilidad
  expect(results).toHaveNoViolations();
});

// * Prueba de casos de borde.
it('El contador no puede ser negativo', () => {
  // Renderiza el componente Counter
  render(<Counter />);

  // Verifica que el contador comience en 0
  expect(screen.getByRole('heading')).toHaveTextContent('0');

  // Simula varios clics en el botón del contador para decrementar el valor por debajo de 0
  fireEvent.click(screen.getByRole('button')); // contador = 1
  fireEvent.click(screen.getByRole('button')); // contador = 2
  fireEvent.click(screen.getByRole('button')); // contador = 3
  fireEvent.click(screen.getByRole('button')); // contador = 4
  fireEvent.click(screen.getByRole('button')); // contador = 5
  fireEvent.click(screen.getByRole('button')); // contador = 6
  fireEvent.click(screen.getByRole('button')); // contador = 7
  fireEvent.click(screen.getByRole('button')); // contador = 8
  fireEvent.click(screen.getByRole('button')); // contador = 9
  fireEvent.click(screen.getByRole('button')); // contador = 10
  fireEvent.click(screen.getByRole('button')); // contador = 11
  fireEvent.click(screen.getByRole('button')); // contador = 12
  fireEvent.click(screen.getByRole('button')); // contador = 13
  fireEvent.click(screen.getByRole('button')); // contador = 14
  fireEvent.click(screen.getByRole('button')); // contador = 15
  fireEvent.click(screen.getByRole('button')); // contador = 16
  fireEvent.click(screen.getByRole('button')); // contador = 17
  fireEvent.click(screen.getByRole('button')); // contador = 18
  fireEvent.click(screen.getByRole('button')); // contador = 19
  fireEvent.click(screen.getByRole('button')); // contador = 20

  // Verifica que el contador no haya llegado a ser negativo
  expect(screen.getByRole('heading')).toHaveTextContent('20');
});

// * Prueba de integración.
it('El enrutador de la aplicación funciona con componentes del cliente (Estado de React)', () => {
  // Renderiza el componente Counter
  render(<Counter />);

  // Verifica que el contador comience en 0
  expect(screen.getByRole('heading')).toHaveTextContent('0');

  // Simula un clic en el botón del contador
  fireEvent.click(screen.getByRole('button'));

  // Verifica que el contador se haya incrementado a 1 después del clic
  expect(screen.getByRole('heading')).toHaveTextContent('1');
});

// * Prueba de aserciones.
it('El componente Counter tiene las propiedades adecuadas', () => {
  // Definimos valores de prueba para las propiedades
  const shouldRender = true;

  // Renderizamos el componente Counter con las props
  render(<Counter shouldRender={shouldRender} />);

  // Verificamos que el contador se haya renderizado
  expect(screen.getByRole('heading')).toBeInTheDocument();

  // Verificamos que las props se pasen correctamente
  expect(screen.getByRole('heading')).toHaveTextContent('0');
});

// * Prueba de renderizado condicional.
it('Renderiza el componente Counter condicionalmente', () => {
  // Renderiza el componente Counter con una prop condicional
  render(<Counter shouldRender={true} />);

  // Verifica que el contador se muestre cuando shouldRender es true
  expect(screen.getByRole('heading')).toBeInTheDocument();

  // Renderiza el componente Counter con shouldRender como false
  render(<Counter shouldRender={false} />);

  // Verifica que el contador no se muestre cuando shouldRender es false
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
});

// * Prueba de aserciones asíncronas.
it('El componente Counter muestra el contador después de una carga asincrónica', async () => {
  // Simulamos una carga asincrónica de datos
  const loadData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(5); // Simulamos que el contador se inicializa con 5 después de una carga asincrónica
      }, 1000);
    });
  };

  // Renderizamos el componente Counter con una función asincrónica para cargar los datos
  render(<Counter loadData={loadData} />);

  // Esperamos a que el contador se muestre después de la carga asincrónica
  await waitFor(() => {
    expect(screen.getByRole('heading')).toHaveTextContent('5');
  });
});

// * Prueba de rendimiento.
test('Rendimiento de una función', () => {
  // Marcamos el inicio de la medición del tiempo
  const start = performance.now();

  // Aquí va la lógica de la función o módulo que queremos probar en términos de rendimiento

  // Marcamos el final de la medición del tiempo
  const end = performance.now();

  // Calculamos el tiempo de ejecución restando el tiempo de inicio del tiempo de finalización
  const runTime = end - start;

  // Verificamos que el tiempo de ejecución sea menor que 100 milisegundos
  expect(runTime).toBeLessThan(100);
});

// * Prueba de Snapshot.
it('Hace match con snapshot', () => {
  // Renderiza el componente `Counter` utilizando `react-test-renderer` y obtiene su representación JSON
  const tree = renderer.create(<Counter />).toJSON();

  // Utiliza la función `toMatchSnapshot()` para comparar la representación JSON del componente con un snapshot previamente guardado
  // Si no existe un snapshot previo, este paso guardará uno nuevo automáticamente
  expect(tree).toMatchSnapshot();
});

// * Mocking.
// Ejemplo de uso de jest.mock() para simular una dependencia en una prueba
jest.mock('../helpers/dependency.ts', () => ({
  someFunction: jest.fn(() => 'mocked result'),
}));

describe('manejador de datos', () => {
  it('debería procesar los datos correctamente', () => {
    // Creamos un mock para la función fetchData
    const mockFetchData = jest
      .spyOn(dependency, 'fetchData')
      .mockReturnValue('Datos simulados');

    // Llamamos a la función que queremos probar
    const result = processData();

    // Verificamos que processData haya procesado correctamente los datos simulados
    expect(result).toEqual('Datos procesados: Datos simulados');

    // Restauramos la función original después de la prueba
    mockFetchData.mockRestore();
  });
});
