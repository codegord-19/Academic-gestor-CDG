import '../styles/notas.css'
import React, { useState, useEffect } from 'react';



const initialData = [
  { id: 1, nombre: "Estudiante1"},
  { id: 2, nombre: "Estudiante2"},
  { id: 3, nombre: "Estudiante3"},
  { id: 4, nombre: "Estudiante4"},
  { id: 5, nombre: "Estudiante5"},
  { id: 6, nombre: "Estudiante6"},
  { id: 7, nombre: "Estudiante7"},
  { id: 8, nombre: "Estudiante8"},
  { id: 9, nombre: "Estudiante9"},
  { id: 10, nombre: "Estudiante10"},
  { id: 12, nombre: "Estudiante11"},
  { id: 13, nombre: "Estudiante12"},
  { id: 14, nombre: "Estudiante13"},
  { id: 15, nombre: "Estudiante14"},
  { id: 16, nombre: "Estudiante15"},
  { id: 17, nombre: "Estudiante16"},
  { id: 18, nombre: "Estudiante17"},
  { id: 19, nombre: "Estudiante18"},
  { id: 20, nombre: "Estudiante19"},
  { id: 21, nombre: "Estudiante20"},


  // ... resto de los datos
];

const Notas = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (index, field, value) => {
    // Asegúrate de que el valor es un número o vacío para evitar errores en el cálculo
    const numericValue = value === '' ? '' : parseFloat(value);
    const newData = data.map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item, [field]: numericValue };
        // Llama a la función de cálculo de la nota final aquí
        updatedItem.final = calculateFinalGrade(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setData(newData);
    localStorage.setItem('notas', JSON.stringify(newData));
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
  item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateFinalGrade = (grades) => {
    // Define los porcentajes para cada tipo de nota
    const weights = { asistencia: 0.1, act: 0.35, ev: 0.35, parcial: 0.2 };
    const actAverage = (grades.act1 + grades.act2 + grades.act3) / 3;
    const evAverage = (grades.ev1 + grades.ev2 + grades.ev3) / 3;

    if (isNaN(grades.asistencia) || isNaN(actAverage) || isNaN(evAverage) || isNaN(grades.parcial)) {
      return "0.00"; // O el valor por defecto que prefieras
    }
    
    // Calcula la nota final
    const finalGrade = 
      (grades.asistencia * weights.asistencia) +
      (actAverage * weights.act) +
      (evAverage * weights.ev) +
      (grades.parcial * weights.parcial);
    
    // Retorna la nota final con dos decimales
    return finalGrade.toFixed(2);
  };

  // Cálculo inicial de las notas finales
  useEffect(() => {
    const loadedData = JSON.parse(localStorage.getItem('notas')) || initialData.map(student => ({
      ...student,
      asistencia: '',
      act1: '',
      act2: '',
      act3: '',
      ev1: '',
      ev2: '',
      ev3: '',
      parcial: '',
      final: calculateFinalGrade(student) // Asegúrate de que este método maneje valores iniciales vacíos.
    }));
    setData(loadedData);
  }, []);
  



  return (
    <div className='contnot'>
      <div className='notitle'><h2>Notas</h2></div>
      <div className='notasform'>
        <form>
          <div>
            <label>Periodo:</label>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <div>
            <label>Curso:</label>
            <select>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
            </select>
          </div>

          <div>
            <label>Materia:</label>
            <select>
                <option>Matemáticas</option>
                <option>Español</option>
                <option>Sociales</option>
                <option>Ciencias</option>
                <option>Idiomas</option>
                <option>Arte</option>
            </select>
          </div>

          <input type="text" id="filter" placeholder="Buscar estudiante...." value={searchTerm} onChange={handleSearchChange}></input>
        </form>
      </div>
      <div className='notas'>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>ESTUDIANTE</th>
              <th>Asistencia</th>
              <th>Act. 1</th>
              <th>Act. 2</th>
              <th>Act. 3</th>
              <th>Ev .1</th>
              <th>Ev .2</th>
              <th>Ev .3</th>
              <th>parcial</th>
              {/* ... resto de los encabezados */}
              <th>Final</th>
            </tr>
          </thead>
          <tbody className='notable'>
            {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.nombre}</td>
                <td><input type="text" value={row.asistencia} onChange={(e) => handleInputChange(index, 'asistencia', e.target.value)} /></td>
                <td><input type="text" value={row.act1} onChange={(e) => handleInputChange(index, 'act1', e.target.value)} /></td>
                <td><input type="text" value={row.act2} onChange={(e) => handleInputChange(index, 'act2', e.target.value)} /></td>
                <td><input type="text" value={row.act3} onChange={(e) => handleInputChange(index, 'act3', e.target.value)} /></td>
                <td><input type="text" value={row.ev1} onChange={(e) => handleInputChange(index, 'ev1', e.target.value)} /></td>
                <td><input type="text" value={row.ev2} onChange={(e) => handleInputChange(index, 'ev2', e.target.value)} /></td>
                <td><input type="text" value={row.ev3} onChange={(e) => handleInputChange(index, 'ev3', e.target.value)} /></td>
                <td><input type="text" value={row.parcial} onChange={(e) => handleInputChange(index, 'parcial', e.target.value)} /></td>
                {/* ... resto de las celdas editables */}
                <td>{row.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notas;
