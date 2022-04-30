import type { NextPage } from 'next';
import { Box, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import LogoImg from '../assets/images/Rick_and_Morty_logo.svg';
import Image from 'next/image';
import { characterType } from '../types/character';
import CardCharacter from '../components/CardCharacter';

const Home: NextPage = () => {

  const character: characterType = {
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
  return (
    <Container>
      <Stack direction="column" spacing={3} p={2}>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
            <Box display="flex" justifyContent="center">
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
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction="column" mt={5} spacing={3} p={2}>
        <CardCharacter character={character} />
      </Stack>
    </Container>
  )
}

export default Home
