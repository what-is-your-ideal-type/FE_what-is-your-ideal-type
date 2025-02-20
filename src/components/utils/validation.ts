import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('이메일 형식을 확인해주세요.')

export const passwordSchema = z
  .string()
  .min(6, '비밀번호는 6자 이상이어야 합니다.')
  .regex(
    /^[A-Za-z0-9]{6,}$/,
    '비밀번호는 영문, 숫자를 혼합하여 6자 이상 입력해주세요.'
  );

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });
