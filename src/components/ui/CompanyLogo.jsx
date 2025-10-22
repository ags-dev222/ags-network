import React from 'react';

/**
 * Reusable company logo component
 * Replaces base64 encoded images with a clean placeholder or actual logo
 */
export const CompanyLogo = ({ 
  src = null, 
  alt = "Company Logo", 
  size = "md",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  // If no src provided, show initials placeholder
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!src || src.startsWith('data:image')) {
    // Fallback to initials or default logo
    const initials = alt ? getInitials(alt) : 'AG';
    
    return (
      <div 
        className={`${sizeClasses[size]} ${className} rounded-full bg-green-100 flex items-center justify-center`}
      >
        <span className="text-xs font-semibold text-green-700">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${className} rounded-full object-cover`}
      onError={(e) => {
        // Fallback if image fails to load
        e.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = `${sizeClasses[size]} ${className} rounded-full bg-green-100 flex items-center justify-center`;
        fallback.innerHTML = `<span class="text-xs font-semibold text-green-700">${getInitials(alt)}</span>`;
        e.target.parentNode.appendChild(fallback);
      }}
    />
  );
};
