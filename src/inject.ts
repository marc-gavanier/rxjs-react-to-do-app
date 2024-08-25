import { piqure } from 'piqure';

const memory = new Map();

const { provide, inject } = piqure(memory);

export { provide, inject };
