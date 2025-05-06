import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ 
    type = 'button', 
    onClick, 
    className = '', 
    disabled = false, 
    children,
    variant = 'primary'
}) => {
    // Definir clases base según la variante
    const baseClasses = {
        primary: 'submit-button',
        secondary: 'toggle-form-button'
    }

    // Combinar clases base con clases adicionales
    const buttonClass = `${baseClasses[variant] || baseClasses.primary} ${className}`

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClass}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary'])
}

export default Button