import { useState } from 'react';

type FormType = 'login' | 'register' | 'forgot';

interface FormData {
  login: { loginEmail: string; loginPassword: string };
  register: { registerName: string; registerEmail: string; registerPassword: string; confirmPassword: string };
  forgot: { forgotEmail: string };
}

const initialData: FormData = {
  login: { loginEmail: '', loginPassword: '' },
  register: { registerName: '', registerEmail: '', registerPassword: '', confirmPassword: '' },
  forgot: { forgotEmail: '' }
};

export const useAuthForm = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('login');
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<FormData>(initialData);
  const [alert, setAlert] = useState<{ type?: FormType; message?: string; success?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const togglePassword = (field: string) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const showForm = (form: FormType) => {
    setCurrentForm(form);
    setAlert({});
    setLoading(false);
  };

  const showAlert = (type: FormType, message: string, success = false) => {
    setAlert({ type, message, success });
    setTimeout(() => setAlert({}), 5000);
  };

  const handleChange = (form: FormType, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [form]: { ...prev[form], [field]: value }
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({});
    const { loginEmail, loginPassword } = formData.login;
    
    if (!loginEmail || !loginPassword) {
      showAlert('login', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual login logic
      if (loginEmail === 'demo@chatapp.com' && loginPassword === '123456') {
        window.alert('Đăng nhập thành công! Chuyển hướng đến trang chat...');
      } else {
        showAlert('login', 'Email hoặc mật khẩu không chính xác!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({});
    const { registerName, registerEmail, registerPassword, confirmPassword } = formData.register;

    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      showAlert('register', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (registerPassword !== confirmPassword) {
      showAlert('register', 'Mật khẩu xác nhận không khớp!');
      return;
    }

    if (registerPassword.length < 6) {
      showAlert('register', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual register logic
      showAlert('register', 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.', true);
      setFormData(prev => ({ ...prev, register: initialData.register }));
      setTimeout(() => showForm('login'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert({});
    const { forgotEmail } = formData.forgot;

    if (!forgotEmail) {
      showAlert('forgot', 'Vui lòng nhập email!');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual forgot password logic
      showAlert('forgot', 'Link khôi phục mật khẩu đã được gửi đến email của bạn!', true);
      setFormData(prev => ({ ...prev, forgot: initialData.forgot }));
    } finally {
      setLoading(false);
    }
  };

  return {
    currentForm,
    showPassword,
    formData,
    alert,
    loading,
    togglePassword,
    showForm,
    handleChange,
    handleLogin,
    handleRegister,
    handleForgot
  };
}; 