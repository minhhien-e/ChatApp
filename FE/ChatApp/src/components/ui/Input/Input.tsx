import React from 'react';
import './Input.css';

interface InputProps {
  type?: string;
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword
}) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.target.parentElement as HTMLElement).style.transform = "scale(1.02)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.target.parentElement as HTMLElement).style.transform = "scale(1)";
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input
          type={showPasswordToggle ? (isPasswordVisible ? 'text' : 'password') : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showPasswordToggle && (
          <span
            className="password-toggle"
            onClick={onTogglePassword}
            tabIndex={-1}
            role="button"
            aria-label="Hiện/ẩn mật khẩu"
          >
            {isPasswordVisible ? "🙈" : "👁️"}
          </span>
        )}
      </div>
    </div>
  );
}; 