import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

interface Bodega {
  id: string;
  nombre: string;
}

const BodegaSelect: React.FC = () => {
  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [selectedBodega, setSelectedBodega] = useState<string>('');

  useEffect(() => {
    const fetchBodegas = async () => {
      const { data, error } = await supabase.from('bodegas_view').select('id, nombre');
      if (error) {
        console.error('Error fetching bodegas:', error);
      } else {
        setBodegas(data);
      }
    };

    fetchBodegas();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBodega(event.target.value);
  };

  return (
    <div>
      <label htmlFor="bodega-select">Seleccionar Bodega:</label>
      <select id="bodega-select" value={selectedBodega} onChange={handleChange}>
        <option value="" disabled>Seleccione una bodega</option>
        {bodegas.map((bodega) => (
          <option key={bodega.id} value={bodega.id}>
            {bodega.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export {BodegaSelect};
