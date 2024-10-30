import { z } from 'zod'

const nameSchema = z
  .string()
  .min(1, 'Имя должно содержать хотя бы один символ')
  .regex(
    /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/,
    'Имя должно начинаться с заглавной буквы и содержать только буквы или дефис'
  )

const loginSchema = z
  .string()
  .min(3, 'Логин должен содержать от 3 до 20 символов')
  .max(20, 'Логин должен содержать от 3 до 20 символов')
  .regex(
    /^(?!\d+$)[a-zA-Z0-9_-]+$/,
    'Логин может содержать только латинские буквы, цифры, дефис и нижнее подчёркивание, но не может состоять только из цифр'
  )

const emailSchema = z
  .string()
  .email('Неверный формат email')
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Email должен содержать буквы перед точкой после "@"'
  )

const passwordSchema = z
  .string()
  .min(8, 'Пароль должен содержать от 8 до 40 символов')
  .max(40, 'Пароль должен содержать от 8 до 40 символов')
  .regex(
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
    'Пароль должен содержать хотя бы одну заглавную букву и цифру'
  )

const phoneSchema = z
  .string()
  .min(10, 'Телефон должен содержать от 10 до 15 символов')
  .max(15, 'Телефон должен содержать от 10 до 15 символов')
  .regex(
    /^\+?\d{10,15}$/,
    'Телефон должен состоять только из цифр и может начинаться с плюса'
  )

const forumTopicTitleSchema = z
  .string()
  .min(4, 'напишите что-нибудь подлиннее')
  .max(128, 'максимум 128 символов')

const forumMessageSchema = z
  .string()
  .max(4000, 'максимум 4000 символов, не время графоманить')

const forumFileSchema = z.any()

export const validationRules = {
  first_name: nameSchema,
  second_name: nameSchema,
  login: loginSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  forum_topic_title: forumTopicTitleSchema,
  forum_message: forumMessageSchema,
  forum_file: forumFileSchema,
}
