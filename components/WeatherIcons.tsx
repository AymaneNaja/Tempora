import React from 'react'

interface IconProps {
    className?: string
}

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#FDB813" />
        <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="#FDB813" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export const CloudIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10H16.74C16.3659 7.69625 14.3359 6 12 6C9.66414 6 7.63414 7.69625 7.26 10H6C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16H18C19.6569 16 21 14.6569 21 13C21 11.3431 19.6569 10 18 10Z" fill="#B1C5D9" />
    </svg>
)

export const RainIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10H16.74C16.3659 7.69625 14.3359 6 12 6C9.66414 6 7.63414 7.69625 7.26 10H6C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16H18C19.6569 16 21 14.6569 21 13C21 11.3431 19.6569 10 18 10Z" fill="#B1C5D9" />
        <path d="M8 18L7 20M12 18L11 20M16 18L15 20" stroke="#4A9FF5" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export const SnowIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10H16.74C16.3659 7.69625 14.3359 6 12 6C9.66414 6 7.63414 7.69625 7.26 10H6C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16H18C19.6569 16 21 14.6569 21 13C21 11.3431 19.6569 10 18 10Z" fill="#B1C5D9" />
        <circle cx="8" cy="19" r="1" fill="#E0F2FE" />
        <circle cx="12" cy="19" r="1" fill="#E0F2FE" />
        <circle cx="16" cy="19" r="1" fill="#E0F2FE" />
    </svg>
)

export const CloudSunIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="5" r="3" fill="#FDB813" />
        <path d="M12 2V3M7.05025 5.05025L7.7574 5.7574M5 10H6M18 10H17M16.9497 5.05025L16.2426 5.7574" stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 14H16.74C16.3659 11.6963 14.3359 10 12 10C9.66414 10 7.63414 11.6963 7.26 14H6C4.34315 14 3 15.3431 3 17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14Z" fill="#B1C5D9" />
    </svg>
)

