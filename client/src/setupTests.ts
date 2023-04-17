import matchers from '@testing-library/jest-dom/matchers'
import { Headers, Request } from 'node-fetch'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// @ts-ignore
globalThis.Request = Request
globalThis.Headers = Headers
