import React from 'react';
import './Button.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  children,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Đang xử lý...' : children}
    </button>
  );
}; 