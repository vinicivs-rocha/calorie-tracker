import React from 'react';

export default function Food({
  name,
  carboQuantity,
  proteinQuantity,
  fatQuantity,
}: {
  name: string;
  carboQuantity: number;
  proteinQuantity: number;
  fatQuantity: number;
}) {
  return (
    <div>
      <p>{name}</p>
      <div>
        <div>
          <span>{carboQuantity}</span>
          <span>Carbos</span>
        </div>
        <div>
          <span>{proteinQuantity}</span>
          <span>Proteínas</span>
        </div>
        <div>
          <span>{fatQuantity}</span>
          <span>Gorduras</span>
        </div>
      </div>
    </div>
  );
}
