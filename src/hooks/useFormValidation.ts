import { useState, useCallback } from 'react';

export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean;
    message?: string;
  };
}

export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Custom hook para validación de formularios
 * Proporciona validación en tiempo real y sanitización de inputs
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: any): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.message || `${name} es requerido`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || `${name} tiene un formato inválido`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return rules.message || `${name} debe tener al menos ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message || `${name} no puede exceder ${rules.maxLength} caracteres`;
    }

    if (rules.min !== undefined && Number(value) < rules.min) {
      return rules.message || `${name} debe ser al menos ${rules.min}`;
    }

    if (rules.max !== undefined && Number(value) > rules.max) {
      return rules.message || `${name} no puede ser mayor a ${rules.max}`;
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.message || `${name} no es válido`;
    }

    return '';
  }, [validationRules]);

  const handleChange = useCallback((name: string, value: any) => {
    // Sanitización básica de inputs
    let sanitizedValue = value;
    if (typeof value === 'string') {
      // Eliminar scripts potencialmente peligrosos
      sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    setValues(prev => ({ ...prev, [name]: sanitizedValue }));
    
    if (touched[name]) {
      const error = validateField(name, sanitizedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  }, [values, validationRules, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
}
