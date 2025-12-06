import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: 'user' | 'email' | 'lock';
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon = 'user'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const renderIcon = () => {
    const iconClasses = "w-5 h-5 text-gray-400";
    switch (icon) {
      case 'user':
        return <User className={iconClasses} />;
      case 'email':
        return <Mail className={iconClasses} />;
      case 'lock':
        return <Lock className={iconClasses} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {renderIcon()}
        </div>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-12 py-3.5 
            border border-gray-300 rounded-full
            text-sm text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:border-gray-400
            transition-colors
          "
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};