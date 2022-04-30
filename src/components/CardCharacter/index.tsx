import React from 'react';
import { characterType } from '../../types/character';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Box, Stack, Card, Button, CardMedia, Typography } from '@mui/material';

interface CardCharacterProps {
  character: characterType
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
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
      <Card className={classes.root}>
        <Stack direction="row" display="flex">
          <Box display="flex" flex={1} flexDirection="column" p={1}>
            <Typography gutterBottom variant="h5">
              {character.name}
            </Typography>
            <Typography gutterBottom variant="body1" color="text.primary">
              {character.species} - {character.gender} - {character.status}
            </Typography>
            <Typography gutterBottom variant="body1" color="text.secondary">
              Origin:
            </Typography>
            <Typography gutterBottom variant="body2" color="text.primary">
              {character.origin?.name || 'unknown'}
            </Typography>
            <Button color="primary" fullWidth variant='contained'>
              Detalhes
            </Button>
          </Box>
          <Box display="flex" flex={0.6}>
            <CardMedia
              component="img"
              height="100%"
              image={character.image}
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
