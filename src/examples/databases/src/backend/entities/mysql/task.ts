import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ExternalIdField } from '@exogee/graphweaver-mikroorm';

@Entity()
export class Task {
	@PrimaryKey({ type: new BigIntType('string') })
	id!: string;

	@Property({ type: String })
	description!: string;

	@Property({ type: Boolean, fieldName: 'completed' })
	isCompleted!: boolean;

	@ExternalIdField({ from: 'user' })
	@Property({ type: new BigIntType('string') })
	userId!: string;
}
