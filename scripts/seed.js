const { db } = require('@vercel/postgres');
const {
  users,
  ubicaciones,
  fuentes,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedUbicaciones(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ubicaciones (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        zipcode VARCHAR(10) NOT NULL UNIQUE,
        lat DECIMAL(8,6) NOT NULL,
        lng DECIMAL(9,6) NOT NULL
      );
    `;

    console.log(`Created "ubicaciones" table`);

    // Insert data into the "ubicaciones" table
    const insertedUbicaciones = await Promise.all(
      ubicaciones.map(async (ubicacion) => {
        return client.sql`
        INSERT INTO ubicaciones (id, name, zipcode, lat, lng)
        VALUES (${ubicacion.id}, ${ubicacion.name}, ${ubicacion.zipcode}, ${ubicacion.lat}, ${ubicacion.lng})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUbicaciones.length} ubicaciones`);

    return {
      createTable,
      ubicaciones: insertedUbicaciones,
    };
  } catch (error) {
    console.error('Error seeding ubicaciones:', error);
    throw error;
  }
}

async function seedFuentes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS fuentes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ubicacion_id UUID NOT NULL,
    name varchar(255),
    lat DECIMAL(8,6),
    lng DECIMAL(9,6)
  );
`;

    console.log(`Created "fuentes" table`);

    // Insert data into the "fuentes" table
    const insertedFuentes = await Promise.all(
      fuentes.map(
        (fuente) => client.sql`
        INSERT INTO fuentes (ubicacion_id, name, lat, lng)
        VALUES (${fuente.ubicacion_id}, ${fuente.name}, ${fuente.lat}, ${fuente.lng})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedFuentes.length} fuentes`);

    return {
      createTable,
      fuentes: insertedFuentes,
    };
  } catch (error) {
    console.error('Error seeding fuentes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedUbicaciones(client);
  await seedFuentes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
