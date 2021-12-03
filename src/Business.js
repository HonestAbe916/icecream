import React from 'react';

export default function Business({ name, address, review, reviewer }) {
	return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{review} ~{reviewer}</p>
    </div>
  );
}