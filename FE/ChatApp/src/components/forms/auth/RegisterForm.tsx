import React from 'react';
import './AuthForms.css';
import {Input,Button} from '@components/ui';
interface RegisterFormProps {
  formData: {
    registerName: string;
    registerEmail: string;
    registerPassword: string;
    confirmPassword: string;
  };
  showPassword: { [key: string]: boolean };
  loading: boolean;
  alert?: { type?: string; message?: string; success?: boolean };
  onChange: (form: string, field: string, value: string) => void;
  onTogglePassword: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchForm: (form: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
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
      <div className={`alert${alert?.type === 'register' && !alert?.success ? ' show' : ''}`}>
        {alert?.type === 'register' && !alert?.success && alert?.message}
      </div>
      <div className={`success-message${alert?.type === 'register' && alert?.success ? ' show' : ''}`}>
        {alert?.type === 'register' && alert?.success && alert?.message}
      </div>

      <Input
        type="text"
        id="registerName"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        value={formData.registerName}
        onChange={(value) => onChange('register', 'registerName', value)}
        required
      />

      <Input
        type="email"
        id="registerEmail"
        label="Email"
        placeholder="Nhập email của bạn"
        value={formData.registerEmail}
        onChange={(value) => onChange('register', 'registerEmail', value)}
        required
        autoComplete="email"
      />

      <Input
        type="password"
        id="registerPassword"
        label="Mật khẩu"
        placeholder="Tạo mật khẩu mạnh"
        value={formData.registerPassword}
        onChange={(value) => onChange('register', 'registerPassword', value)}
        required
        autoComplete="new-password"
        showPasswordToggle
        isPasswordVisible={showPassword.registerPassword}
        onTogglePassword={() => onTogglePassword('registerPassword')}
      />

      <Input
        type="password"
        id="confirmPassword"
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        value={formData.confirmPassword}
        onChange={(value) => onChange('register', 'confirmPassword', value)}
        required
        autoComplete="new-password"
        showPasswordToggle
        isPasswordVisible={showPassword.confirmPassword}
        onTogglePassword={() => onTogglePassword('confirmPassword')}
      />

      <Button type="submit" loading={loading}>
        Tạo tài khoản
      </Button>

      <div className="form-switch">
        <p>Đã có tài khoản?</p>
        <Button onClick={() => onSwitchForm('login')}>
          Đăng nhập
        </Button>
      </div>
    </form>
  );
}; 