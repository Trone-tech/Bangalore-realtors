import React from 'react';

interface StatCardProps {
  number: string;
  title: string;
  description: string;
}

const StatCard = ({ number, title, description }: StatCardProps) => {
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default StatCard;