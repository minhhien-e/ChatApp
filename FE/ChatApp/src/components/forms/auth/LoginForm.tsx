import React from 'react';
import {Input,Button} from '@components/ui';
import './AuthForms.css';
interface LoginFormProps {
  formData: { loginEmail: string; loginPassword: string };
  showPassword: { [key: string]: boolean };
  loading: boolean;
  alert?: { type?: string; message?: string; success?: boolean };
  onChange: (form: string, field: string, value: string) => void;
  onTogglePassword: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchForm: (form: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  showPassword,
  loading,
  alert,
  onChange,
  onTogglePassword,
  onSubmit,
  onSwitchForm
}) => {
  return (
    <form className="form active" onSubmit={onSubmit} autoComplete="off">
      <div className={`alert${alert?.type === 'login' && !alert?.success ? ' show' : ''}`}>
        {alert?.type === 'login' && !alert?.success && alert?.message}
      </div>
      
      <Input
        type="email"
        id="loginEmail"
        label="Email"
        placeholder="Nhập email của bạn"
        value={formData.loginEmail}
        onChange={(value) => onChange('login', 'loginEmail', value)}
        required
        autoComplete="email"
      />

      <Input
        type="password"
        id="loginPassword"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        value={formData.loginPassword}
        onChange={(value) => onChange('login', 'loginPassword', value)}
        required
        autoComplete="current-password"
        showPasswordToggle
        isPasswordVisible={showPassword.loginPassword}
        onTogglePassword={() => onTogglePassword('loginPassword')}
      />

      <Button type="submit" loading={loading}>
        Đăng nhập
      </Button>

      <div className="form-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchForm('forgot'); }}>
          Quên mật khẩu?
        </a>
      </div>

      <div className="form-switch">
        <p>Chưa có tài khoản?</p>
        <Button onClick={() => onSwitchForm('register')}>
          Đăng ký ngay
        </Button>
      </div>
    </form>
  );
}; 