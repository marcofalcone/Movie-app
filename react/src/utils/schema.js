import { object, string } from 'yup';


export const loginSchema = object({
  username: string().required(),
  password: string().min(8).required(),
});

export const registerSchema = object({
  username: string().required(),
  password: string().min(8).required(),
});
