export type InputProps = {
  name: string;
  title: string;
  validate?: (value: string) => undefined | string;
  size?: 'small' | 'medium';
  type?: 'password' | 'text';
  id?: string;
};