import Validator from 'validatorjs';
import { errorResponse } from './responses';

const validate = async (res, next, data, schema) => {
  const validator = await new Validator(data, schema);
  validator.passes(() => next());
  validator.fails(() => {
    const errors = validator.errors.all();
    return errorResponse(res, 400, errors);
  });
};

export default validate;
