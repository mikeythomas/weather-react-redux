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
  height: 16px;
`;

function ImageButton({ onClick, src }) {
  return <Button onClick={onClick}><Image src={src} /></Button>
}

export const CloseButton = props => <ImageButton {...props} src={close} />
export const RefreshButton = props => <ImageButton {...props} src={refresh} />
