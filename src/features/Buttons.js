import React from 'react';
import styled from 'styled-components';

import close from '../assets/close-icon.svg';
import refresh from '../assets/refresh-icon.svg';

const Button = styled.button`
  background: none;
  border: none;
  &:hover {
    background: #ddf;
  }
`;

const Image = styled.img`
  height: ${props => props.height || '16px'};
`;

function ImageButton({ onClick, src, height }) {
  return <Button onClick={onClick}><Image src={src} height={height} /></Button>
}

export const CloseButton = props => <ImageButton {...props} src={close} />
export const RefreshButton = props => <ImageButton {...props} src={refresh} />
