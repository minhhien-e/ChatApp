import React from 'react';
import { Input, Button } from '@components/ui';
import './AuthForms.css';

interface ForgotFormProps {
  formData: { forgotEmail: string };
  loading: boolean;
  alert?: { type?: string; message?: string; success?: boolean };
  onChange: (form: string, field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchForm: (form: string) => void;
}

export const ForgotForm: React.FC<ForgotFormProps> = ({
  formData,
  loading,
  alert,
  onChange,
  onSubmit,
  onSwitchForm
}) => {
  return (
    <form className="form active" onSubmit={onSubmit} autoComplete="off">
      <div className={`alert${alert?.type === 'forgot' && !alert?.success ? ' show' : ''}`}>
        {alert?.type === 'forgot' && !alert?.success && alert?.message}
      </div>
      <div className={`success-message${alert?.type === 'forgot' && alert?.success ? ' show' : ''}`}>
        {alert?.type === 'forgot' && alert?.success && alert?.message}
      </div>

      <Input
        type="email"
        id="forgotEmail"
        label="Email"
        placeholder="Nhập email để khôi phục mật khẩu"
        value={formData.forgotEmail}
        onChange={(value) => onChange('forgot', 'forgotEmail', value)}
        required
        autoComplete="email"
      />

      <Button type="submit" loading={loading}>
        Gửi link khôi phục
      </Button>

      <div className="form-switch">
        <p>Nhớ mật khẩu rồi?</p>
        <Button onClick={() => onSwitchForm('login')}>
          Quay lại đăng nhập
        </Button>
      </div>
    </form>
  );
}; 