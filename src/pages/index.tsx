import type { NextPage } from 'next';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import LogoImg from '../assets/images/Rick_and_Morty_logo.svg';
import Image from 'next/image';
import { characterType } from '../types/character';
import CardCharacter from '../components/CardCharacter';

const Home: NextPage = () => {

  const characters: characterType[] = [{
    "id": 1,
    "name": "Abadango Cluster Princess",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/2",
    "created": "2017-11-04T18:50:21.651Z"
  },
  {
    "id": 2,
    "name": "Morty Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/2",
    "created": "2017-11-04T18:50:21.651Z"
  }
  ];

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={3} p={2}>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
            <Box display="flex" justifyContent="center" mt={3}>
              <Image src={LogoImg} height="150" width="500" alt='Logo' />
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              gap={2}
            >
              <Typography
                my={2}
                width="100%"
                align='left'
                variant='h5'
                color="text.primary"
              >
                Filtros
              </Typography>
              <TextField
                label="Nome do personagem"
                variant='filled'
                size='medium'
                fullWidth
              />
              <Button
                color="primary"
                fullWidth
                variant='contained'
              >
                Detalhes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Box mt={10} height="100%">
        <Grid container spacing={2}>
          {characters.map((character) => (
            <Grid key={character.id} item xs={12} sm={6} md={4} lg={4} xl={4} p={0}>
              <CardCharacter character={character} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
