// Datos utilizados para rellenar la base de datos al iniciar la aplicación por primera vez
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];
const ubicaciones = [
  {
    id: '3958dc9e-799f-4377-85e9-fec4b6a6442a',
    name: 'Ontinyent',
    zipcode: '46870',
    lat: '38.821934',
    lng: '-0.606589',
  },
  {
    id: 'a6b4a6c6-8d66-4b8e-8c8a-1c8a8a8a8a8a',
    name: 'Xàtiva',
    zipcode: '46800',
    lat: '38.989941',
    lng: '-0.523532',
  },
];
const fuentes = [
  {
    ubicacion_id: ubicaciones[0].id,
    name: 'Font Sant Antoni',
    lat: '38.819665',
    lng: '-0.604492',
    imgUrl: 'https://i.imgur.com/iT4wb6F.png',
  },
  {
    ubicacion_id: ubicaciones[0].id,
    name: 'Fuente 2',
    lat: '38.819674',
    lng: '-0.604491',
  },
];

module.exports = {
  users,
  ubicaciones,
  fuentes,
};
