import React from 'react';
import { characterType } from '../../types/character';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Box, Stack, Card, Button, CardMedia, Typography } from '@mui/material';

interface CardCharacterProps {
  character: characterType
};

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    transition: 'transform .3s',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  }
}));

const CardCharacter = ({ character }: CardCharacterProps) => {
  const classes = useStyles();
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Stack direction="row" display="flex">
          <Box display="flex" flex={1} flexDirection="column" p={2}>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </Box>
          <Box display="flex" flex={1}>
            <CardMedia
              component="img"
              height="100%"
              image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
              className={classes.image}
              alt={character.name}
            />
          </Box>
        </Stack>
      </Card>
    </div>
  );
};

export default CardCharacter;
