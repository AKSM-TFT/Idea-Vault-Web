export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    secondary: 'bg-white text-black border border-black hover:bg-gray-100 focus:ring-black',
    danger: 'bg-white text-red-600 border border-red-600 hover:bg-red-50 focus:ring-red-600',
    ghost: 'bg-transparent text-gray-600 hover:text-black hover:bg-gray-100 focus:ring-gray-400'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
