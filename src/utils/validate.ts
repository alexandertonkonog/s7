export const isLengthValidate = (min: number, max: number) => (value?: string): string | undefined => {
  if (!value) return 'Field is required';
  if (value.length < min) return `The field length must be at least ${min} characters`;
  if (value.length > max) return `The field length must not exceed ${max} characters`;
}

export const isRequired = (value?: string): string | undefined => {
  if (!value) return 'Field is required';
}