import { gql } from '@apollo/client';
import { Entity } from './use-schema';

export const SCHEMA_QUERY = gql`
	query graphweaver {
		result: _graphweaver {
			entities {
				name
				plural
				backendId
				summaryField
				defaultFilter
				fields {
					name
					type
					isArray
					relationshipType
					relatedEntity
					filter {
						type
					}
					attributes {
						isReadOnly
						isRequired
					}
					extensions {
						key
					}
				}
				attributes {
					isReadOnly
					exportPageSize
				}
			}
			enums {
				name
				values {
					name
					value
				}
			}
		}
	}
`;

export const generateGqlSelectForEntityFields = (
	entity: Entity,
	entityByType?: (entityType: string) => Entity
) =>
	entity.fields
		.map((field) => {
			if (field.relationshipType) {
				if (!entityByType) {
					return `${field.name} { value: id }`;
				}
				const relatedEntity = entityByType(field.type);
				return `${field.name} { 
					value: id
					label: ${relatedEntity?.summaryField || 'id'}
				}`;
			} else {
				if (field.type === 'Media') {
					return `${field.name} { filename, type, url }`;
				}
				return field.name;
			}
		})
		.join(' ');
