// src/features/Contact/index.ts
// Production-ready central barrel exports matching Register feature standard

export * from './Form/ContactSalesFormWrapper';
export * from './Form/ContactSalesForm';
export * from './Service/ContactService';
export { default as contactApi } from './Service/ContactService';
export * from './Types/ContactTypes';
export * from './Constants/ContactConstants';
export * from './validation/ContactValidation';
export { ContactView } from './components/ContactView';
export { default } from './components/ContactView';
