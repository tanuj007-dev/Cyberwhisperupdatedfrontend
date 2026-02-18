export const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button' }) => {
    const baseStyles = 'font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

    const variants = {
        primary: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white focus:ring-violet-500 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white focus:ring-red-500 shadow-lg shadow-red-500/25',
        success: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-500/25',
        outline: 'border-2 border-gray-300 hover:border-violet-400 text-gray-700 hover:text-violet-600 hover:bg-violet-50/50 focus:ring-violet-400',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export const Input = ({ label, name, type = 'text', value, onChange, placeholder, required, error, className = '', disabled }) => {
    const safeValue = value ?? '';
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={safeValue}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-400 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export const Textarea = ({ label, name, value, onChange, placeholder, required, error, rows = 4, className = '' }) => {
    const safeValue = value ?? '';
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={safeValue}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder:text-gray-400 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export const Select = ({ label, name, value, onChange, options, required, error, className = '', placeholder = 'Select...' }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-gray-900 bg-white ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            >
                <option value="">{placeholder}</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export const Toggle = ({ label, name, checked, onChange, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <button
                type="button"
                onClick={() => onChange({ target: { name, checked: !checked } })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${checked ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
            {label && <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>}
        </div>
    );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700 border border-gray-200',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        danger: 'bg-red-50 text-red-700 border border-red-200',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200',
        info: 'bg-blue-50 text-blue-700 border border-blue-200',
        purple: 'bg-violet-50 text-violet-700 border border-violet-200'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const Card = ({ children, className = '', title, actions }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
            {(title || actions) && (
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
};

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />

                <div className={`relative bg-white rounded-2xl shadow-2xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200`}>
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        {children}
                    </div>

                    {footer && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Skeleton = ({ className = '', variant = 'default' }) => {
    const variants = {
        default: 'h-4 w-full',
        title: 'h-8 w-3/4',
        text: 'h-4 w-full',
        avatar: 'h-12 w-12 rounded-full',
        image: 'h-48 w-full rounded-xl'
    };

    return (
        <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg ${variants[variant]} ${className}`} />
    );
};

export const Toast = ({ isVisible, message, type = 'success', onClose }) => {
    if (!isVisible) return null;

    const types = {
        success: 'bg-white text-gray-900 border-emerald-500',
        error: 'bg-white text-gray-900 border-red-500',
        warning: 'bg-white text-gray-900 border-amber-500',
        info: 'bg-white text-gray-900 border-blue-500'
    };

    const iconBgs = {
        success: 'bg-emerald-100',
        error: 'bg-red-100',
        warning: 'bg-amber-100',
        info: 'bg-blue-100'
    };

    const icons = {
        success: (
            <div className={`p-2 rounded-full ${iconBgs.success}`}>
                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        error: (
            <div className={`p-2 rounded-full ${iconBgs.error}`}>
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        warning: (
            <div className={`p-2 rounded-full ${iconBgs.warning}`}>
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
        ),
        info: (
            <div className={`p-2 rounded-full ${iconBgs.info}`}>
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </div>
        )
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-l-4 shadow-2xl ${types[type]} min-w-[320px] bg-white`}>
                {icons[type]}
                <p className="flex-1 font-medium text-gray-900">{message}</p>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
