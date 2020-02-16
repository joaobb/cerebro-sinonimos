import React, { Component } from 'react';
import Preview from './Sinonimos'

const id = "sinonimos"
const title = "Sinonimos";
const icon = "https://i.imgur.com/mX6wsUR.png";

export const fn = ({ term, display }) => {
  display({
    id,
    icon,
    title,
    subtitle: "Procurador de sinonimos",
    getPreview: () => <Preview word={term} />,
    onSelect: () => openSinonimos(term),
  })
}

function openSinonimos(word) {
  const encodedQuery = encodeURIComponent(word);

  actions.open(`https://sinonimos.com.br/${encodedQuery}`)
  actions.hideWindow();
}
