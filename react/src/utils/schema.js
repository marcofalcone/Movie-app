import { object, string } from 'yup';


export const loginSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
});

export const registerSchema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
});
