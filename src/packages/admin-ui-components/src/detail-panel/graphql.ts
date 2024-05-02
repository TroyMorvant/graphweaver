import { gql } from '@apollo/client';
import { Entity, generateGqlSelectForEntityFields } from '../utils';

export const generateUpdateEntityMutation = (
	entity: Entity,
	entityByType: (entityType: string) => Entity
) => gql`
    mutation updateEntity ($input: ${entity.name}CreateOrUpdateInput!){
      update${entity.name} (input: $input) {
        id
        ${generateGqlSelectForEntityFields(entity, entityByType)}
      }
    }
  `;

export const generateCreateEntityMutation = (
	entity: Entity,
	entityByType: (entityType: string) => Entity
) => gql`
    mutation createEntity ($input: ${entity.name}InsertInput!){
      create${entity.name} (input: $input) {
        id
        ${generateGqlSelectForEntityFields(entity, entityByType)}
      }
    }
  `;

export const generateDeleteEntityMutation = (entity: Entity) => gql`
    mutation deleteEntity ($id: ID!){
      delete${entity.name} (id: $id)
    }
  `;

export const generateDeleteManyEntitiesMutation = (entity: Entity) => gql`
mutation deleteManyEntities ($ids: [ID!]!){
  delete${entity.plural} (filter: { id_in: $ids })
}
`;

export const getRelationshipQuery = (pluralName: string, summaryField?: string) => {
	const queryName = pluralName[0].toLowerCase() + pluralName.slice(1);

	return gql`
    query getRelationship ($pagination: ${pluralName}PaginationInput) {
      result: ${queryName} (pagination: $pagination) {
        id
        ${summaryField ? summaryField : ''}
      }
    }
  `;
};

export const getUploadUrlMutation = gql`
	mutation GetUploadUrl($key: ID!) {
		getUploadUrl(key: $key)
	}
`;
