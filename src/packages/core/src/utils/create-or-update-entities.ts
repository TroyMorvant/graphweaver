import { Database } from '../database';

// Other necessary imports

/**
 * Creates or updates a batch of entities in the database.
 * If creating a new entity and the primary key is DB-generated, the id field must not be provided by the client.
 */
export async function createOrUpdateEntities(entities: any[], options: { clientGeneratedPrimaryKeys: boolean, /* other options */ any }): Promise<any[]> {
  // Some preliminary processing here

  // Iterate through each entity and prepare for creation/update
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];

    // For creation, if a client-supplied ID exists while clientGeneratedPrimaryKeys is disabled, remove it.
    // This allows the database to generate the ID automatically.
    if (entity.id && !options.clientGeneratedPrimaryKeys) {
      // Instead of throwing an error, remove the id so that the DB can generate it
      delete entity.id;
    }

    // Additional processing on the entity could go here (e.g., setting timestamps, validation, etc.)
  }

  // Insert or update the entities in the database
  const createdEntities = await Database.insertEntities(entities);

  return createdEntities;
}
