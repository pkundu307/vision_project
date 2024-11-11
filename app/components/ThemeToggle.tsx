// components/ThemeToggle.tsx
"use client"
// components/ThemeToggle.tsx
// components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
<button onClick={toggleTheme} className="p-1 rounded-lg shadow-lg bg-background text-gray-800 hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
  {isDarkMode ? '☀️' : '🌙'}
</button>

  );
};

export default ThemeToggle;
