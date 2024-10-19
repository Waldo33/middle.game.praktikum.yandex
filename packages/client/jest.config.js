import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@processes/(.*)$': '<rootDir>/src/processes/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    // '^@features/(.*)$': '<rootDir>/src/features/$1',
    // '^@entities/(.*)$': '<rootDir>/src/entities/$1',
  },
}
