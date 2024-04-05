import React from 'react'
import styled from 'styled-components';


const SemiTransparentDiv = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  background-color: #f2f2f2; /* White background */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sticker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg); /* Diagonal rotation */
  background-color: transparent;
`;

const StickerText = styled.span`
  color: red;
  font-size: 16px;
  font-weight: bold;
`;


const BoughtDiv = () => {
    return (
        <SemiTransparentDiv>
            <Sticker>
                <StickerText>Bought!</StickerText>
            </Sticker>
        </SemiTransparentDiv>
    )
}

export default BoughtDiv