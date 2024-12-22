import {v4 as uuidv4} from "uuid";
import {UUID} from '@model/shared.model';

export const uuid = (): UUID => uuidv4() as UUID;
