import { IUserResponseData } from '@interfaces/ICommon';
import Joi, { Schema } from 'joi';

export function verifyJoiSchemas(
  value: object,
  joiSchema: Schema,
  message: string,
) {
  return Joi.assert(value, joiSchema, message);
}

export function userDataSchema(data: IUserResponseData) {
  const { surname = null } = data;
  return Joi.object({
    id: Joi.number().valid(data.id).required(),
    register: Joi.string().required(),
    name: Joi.string().valid(data.name).required(),
    surname: Joi.string().valid(surname).required(),
    email: Joi.string().valid(data.email).required(),
    avatar: Joi.string().valid(null).required(),
    roles: Joi.array().length(0).required(),
    hasPasswordExist: Joi.boolean().valid(data.hasPasswordExist).required(),
  }).required();
}
