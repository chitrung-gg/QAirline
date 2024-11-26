
import { DataSource } from 'typeorm';
import { Client } from 'pg'
import { DATABASE_CONFIG } from 'src/database/database.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const client = new Client({
            host: DATABASE_CONFIG.host,
            port: DATABASE_CONFIG.port,
            user: DATABASE_CONFIG.username,
            password: DATABASE_CONFIG.password,
        });
        
        await client.connect();

        // Check if the database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DATABASE_CONFIG.database]);

        if (res.rows.length === 0) {
            console.log(`Database '${DATABASE_CONFIG.database}' does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${DATABASE_CONFIG.database}`);
        } else {
            console.log(`Database ${DATABASE_CONFIG.database} already created`)
        }

        // Disconnect the client after database creation
        await client.end();

        const dataSource = new DataSource({
            type: 'postgres',
            host: DATABASE_CONFIG.host,
            port: DATABASE_CONFIG.port,
            username: DATABASE_CONFIG.username,
            password: DATABASE_CONFIG.password,
            database: DATABASE_CONFIG.database,
            entities: [],
            synchronize: true,          // false for production
        });

        return dataSource.initialize();
    },
  },
];
