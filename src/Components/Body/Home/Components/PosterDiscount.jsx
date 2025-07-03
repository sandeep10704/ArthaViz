import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import ImagesAssets from '../../../../Assets/ImagesAssets';
import CustomButton from '../../../CommonComponents/CustomButton';
import { imageHoverBoxStyle } from '../../../../Assets/CommonCss';
import ColorPalette from '../../../../Assets/ColorPalette';



const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  flex-wrap: wrap;

  ${imageHoverBoxStyle}

  @media (max-width: 960px) {
    flex-direction: column;
    padding: 20px;
  }
`;


const ProductImage = styled.img`
  width: 690px;
  max-width: 90%%;
  height: auto;
  object-fit: contain;
  margin: 20px;

  @media (max-width: 960px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const TextSection = styled(Box)`
  width: 550px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  margin: 20px;

  @media (max-width: 960px) {
    width: 100%;
    align-items: flex-start; /* changed from center */
    text-align: left;        /* changed from center */
  }
`;

const TimerBox = styled(Box)`
  display: flex;
  gap: 10px;
  justify-content: flex-start; /* changed from center */
`;

const TimeUnit = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 48px;
    font-weight: bold;
  }

  span:last-child {
    font-size: 28px;
    color: #555;
  }
`;

const Separator = styled.span`
  font-size: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color:${ColorPalette.orange}
`;




// Timer Logic Hook
const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.max(0, Math.floor(countDown / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((countDown % (1000 * 60)) / 1000));

    return [days, hours, minutes, seconds];
};

const PosterDiscount = () => {
    // Set your countdown target date here
    const [days, hours, minutes, seconds] = useCountdown('2025-07-23T23:59:59');

    return (
        <Container>
            <ProductImage src={ImagesAssets.Poster02} alt="Apple Products" />

            <TextSection>
                <Typography variant="h3" sx={{ fontWeight: 200 }}>
                    30% DISCOUNT ON APPLE COLLECTION
                </Typography>

                <TimerBox>
                    <TimeUnit>
                        <span>{days}</span>
                        <span>Days</span>
                    </TimeUnit>
                    <Separator>:</Separator>
                    <TimeUnit>
                        <span>{hours}</span>
                        <span>Hrs</span>
                    </TimeUnit>
                    <Separator>:</Separator>
                    <TimeUnit>
                        <span>{minutes}</span>
                        <span>Min</span>
                    </TimeUnit>
                    <Separator>:</Separator>
                    <TimeUnit>
                        <span>{seconds}</span>
                        <span>Sec</span>
                    </TimeUnit>
                </TimerBox>

                <Box sx={{ width: 'auto' }}>
                    <CustomButton text={"Shop Collection"} />
                </Box>
            </TextSection>
        </Container>
    );
};

export default PosterDiscount;
