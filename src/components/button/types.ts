export type ButtonProps = {
  label?: string;
  'aria-label'?: string;
  'data-name'?: string;
  'data-testid'?: string;
  onClick?: () => void;
  onKeyDown?: () => void;
  disabled?: boolean;
  className?: string;
  customStyle?: Record<string, unknown>;
  useTitle?: boolean;
};
