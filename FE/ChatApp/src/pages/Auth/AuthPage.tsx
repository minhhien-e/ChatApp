import React from "react";
import "./AuthPage.css";
import { useAuthForm } from "@/hooks";
import {
  RegisterForm,
  LoginForm as LoginFormComponent,
  ForgotForm,
} from "@/components/forms";

type FormType = "login" | "register" | "forgot";

export const AuthPage: React.FC = () => {
  const {
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
    handleForgot,
  } = useAuthForm();

  const handleFormChange = (form: string, field: string, value: string) => {
    handleChange(form as FormType, field, value);
  };

  const handleFormSwitch = (form: string) => {
    showForm(form as FormType);
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="logo">
          <div className="logo-icon"></div>
          <h1>ChatApp</h1>
          <p>Kết nối mọi lúc, mọi nơi</p>
        </div>
        <div className="form-container">
          {currentForm === "login" && (
            <LoginFormComponent
              formData={formData.login}
              showPassword={showPassword}
              loading={loading}
              alert={alert}
              onChange={handleFormChange}
              onTogglePassword={togglePassword}
              onSubmit={handleLogin}
              onSwitchForm={handleFormSwitch}
            />
          )}
          {currentForm === "register" && (
            <RegisterForm
              formData={formData.register}
              showPassword={showPassword}
              loading={loading}
              alert={alert}
              onChange={handleFormChange}
              onTogglePassword={togglePassword}
              onSubmit={handleRegister}
              onSwitchForm={handleFormSwitch}
            />
          )}
          {currentForm === "forgot" && (
            <ForgotForm
              formData={formData.forgot}
              loading={loading}
              alert={alert}
              onChange={handleFormChange}
              onSubmit={handleForgot}
              onSwitchForm={handleFormSwitch}
            />
          )}
        </div>
      </div>
    </div>
  );
};
