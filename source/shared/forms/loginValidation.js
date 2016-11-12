import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const loginValidation = createValidator({
  username: [required, maxLength(10)],
  password: [required]
});
export default memoize(10)(loginValidation);
