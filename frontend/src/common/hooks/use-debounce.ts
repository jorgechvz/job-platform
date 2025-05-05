import { useState, useEffect } from "react";

/**
 * Hook para aplicar debounce a un valor.
 * Útil para retrasar operaciones costosas (como llamadas API) hasta que el valor
 * haya dejado de cambiar durante un período de tiempo específico.
 *
 * @param value El valor que se quiere debounced.
 * @param delay El tiempo en milisegundos a esperar antes de actualizar el valor debounced.
 * @returns El valor debounced.
 */
function useDebounce<T>(value: T, delay: number): T {
  // Estado para almacenar el valor debounced
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Configura un temporizador para actualizar el valor debounced
      // solo después de que el valor original no haya cambiado durante el 'delay' especificado.
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Función de limpieza: se ejecuta si 'value' o 'delay' cambian antes de que
      // el temporizador termine, o si el componente se desmonta.
      // Esto cancela el temporizador pendiente, evitando actualizaciones prematuras.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Solo re-ejecuta el efecto si 'value' o 'delay' cambian
  );

  // Devuelve el valor debounced
  return debouncedValue;
}

export default useDebounce;
