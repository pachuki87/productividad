
import { WeeklyData } from './types';

export const PRIMARY_GREEN = '#6ea55a';

export const INITIAL_DATA: WeeklyData = {
  weekStart: '30.11.2025',
  days: [
    {
      name: 'Domingo',
      date: '30.11.2025',
      progress: 60,
      tasks: [
        { id: '1', text: 'Gym', completed: false },
        { id: '2', text: 'Cena familia', completed: true },
        { id: '3', text: 'Prep s de Heloisa', completed: true },
        { id: '4', text: 'Comprar vitaminas', completed: false },
        { id: '5', text: 'Pasar en la floristería', completed: true },
        { id: '6', text: 'Hacer la compra', completed: true },
        { id: '7', text: 'Lectura', completed: false },
      ]
    },
    {
      name: 'Lunes',
      date: '01.12.2025',
      progress: 63,
      tasks: [
        { id: '8', text: 'Revisar métricas', completed: false },
        { id: '9', text: 'Responder correos', completed: false },
        { id: '10', text: 'Escribir guiones', completed: true },
        { id: '11', text: 'GYM', completed: true },
        { id: '12', text: 'Responder a comunidad', completed: false },
        { id: '13', text: 'Leer nuevas tendencias', completed: true },
        { id: '14', text: 'Lectura', completed: true },
      ]
    },
    {
      name: 'Martes',
      date: '02.12.2025',
      progress: 33,
      tasks: [
        { id: '15', text: 'Organizar calendario', completed: false },
        { id: '16', text: 'Mandar emails', completed: true },
        { id: '17', text: 'Crear páginas extras', completed: false },
        { id: '18', text: 'Descanso 30min', completed: false },
        { id: '19', text: 'GYM', completed: true },
        { id: '20', text: 'Revisar web', completed: false },
        { id: '21', text: 'Llamar a Gabriel', completed: true },
        { id: '22', text: 'Lectura', completed: false },
      ]
    },
    {
      name: 'Miércoles',
      date: '03.12.2025',
      progress: 82,
      tasks: [
        { id: '23', text: 'Revisar presupuesto', completed: false },
        { id: '24', text: 'Revisar el inventario', completed: true },
        { id: '25', text: 'Ordenar archivos', completed: false },
        { id: '26', text: 'Reunión equipo', completed: true },
        { id: '27', text: 'Revisar facturación', completed: true },
        { id: '28', text: 'GYM', completed: true },
        { id: '29', text: 'Generar contenido', completed: true },
        { id: '30', text: 'Corregir miniatura', completed: true },
        { id: '31', text: 'Revisar emails', completed: true },
        { id: '32', text: 'Lectura', completed: true },
      ]
    },
    {
      name: 'Jueves',
      date: '04.12.2025',
      progress: 85,
      tasks: [
        { id: '33', text: 'Ver CTR del día', completed: true },
        { id: '34', text: 'Subir un reel', completed: true },
        { id: '35', text: 'Reunión con Beto', completed: false },
        { id: '36', text: 'Escribir un hook', completed: true },
        { id: '37', text: 'Actualizar creatividades', completed: true },
        { id: '38', text: 'Hacer remarketing', completed: true },
        { id: '39', text: 'Optimizar botones', completed: true },
        { id: '40', text: 'Ordenar el Drive', completed: true },
        { id: '41', text: 'GYM', completed: true },
      ]
    },
    {
      name: 'Viernes',
      date: '05.12.2025',
      progress: 50,
      tasks: [
        { id: '42', text: 'Responder comentarios', completed: true },
        { id: '43', text: 'Hacer calendario posts', completed: true },
        { id: '44', text: 'Leer nuevos leads', completed: false },
        { id: '45', text: 'Mentoria a las 12:00', completed: true },
        { id: '46', text: 'Actualizar precios', completed: true },
        { id: '47', text: 'GYM', completed: false },
        { id: '48', text: 'Cenar en familia', completed: false },
      ]
    },
    {
      name: 'Sábado',
      date: '06.12.2025',
      progress: 100,
      tasks: [
        { id: '49', text: 'Activar un test A/B', completed: true },
        { id: '50', text: 'Reunión con Noemí', completed: true },
        { id: '51', text: 'Exportar métricas', completed: true },
        { id: '52', text: 'Comprobar NR', completed: true },
        { id: '53', text: 'Subir caja de preguntas', completed: true },
        { id: '54', text: 'Actualizar mockup', completed: true },
        { id: '55', text: 'Mandar email Valentina', completed: true },
        { id: '56', text: 'Revisar objetivos', completed: true },
        { id: '57', text: 'GYM', completed: true },
        { id: '58', text: 'Cena Romántica', completed: true },
      ]
    },
  ],
  habits: [
    { id: 'h1', name: 'Despertar 6am', history: [true, true, true, true, true, true, true] },
    { id: 'h2', name: 'No alcohol 🍺', history: [true, true, true, true, true, false, false] },
    { id: 'h3', name: 'No Instagram 🚫', history: [true, true, true, true, false, false, false] },
    { id: 'h4', name: 'Lectura 📚', history: [false, false, false, false, false, false, false] },
  ]
};
