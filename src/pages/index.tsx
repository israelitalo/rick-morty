import type { NextPage } from 'next';
import { gql, request } from 'graphql-request';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import {
  Box, Button, Container, Grid, Pagination, Stack, TextField, Typography
} from '@mui/material';

import { BASE_URL } from '../api';
import LogoImg from '../assets/images/Rick_and_Morty_logo.svg';
import CardCharacter from '../components/CardCharacter';
import { characterListType } from '../types/character';

const Home: NextPage = () => {

  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [inputChange, setInputChange] = useState('');

  const { data } = useQuery<characterListType, Error>(
    ['characters', page, name],
    async () =>
      await request(BASE_URL,
        gql`query {
          characters(page: ${page}, filter: {name: "${name}"} ) {
            info {
              count pages next prev
            }
            results {
              id name status species type gender image
              origin {
                name
              }
            }
          }
        }`
      ),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handlePage = (_: any, value: number) => {
    setPage(value);
    router.push(`?page=${value}&name=${name}`, undefined, { shallow: true });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPage = 1;

    setPage(newPage);

    setName(inputChange);

    router.push(`?page=${newPage}&name=${inputChange}`, undefined, { shallow: true });
  }

  useEffect(() => {
    router.query.page ? setPage(Number(router.query.page)) : setPage(1);

    if (router.query.name) {
      setName(String(router.query.name));
      setInputChange(String(router.query.name));
    } else {
      setName('');
      setInputChange('');
    }
  }, [router.query]);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={3} py={2}>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={8} sm={6} xs={12}>
            <Box display="flex" justifyContent="center" mt={3}>
              <Image src={LogoImg} height="150" width="500" alt='Logo' />
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <form onSubmit={handleSubmit}>
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
                  Filters
                </Typography>
                <TextField
                  label="Character"
                  variant='filled'
                  size='medium'
                  fullWidth
                  value={inputChange || ''}
                  onChange={event => setInputChange(event.target.value)}
                />
                <Button
                  color="primary"
                  fullWidth
                  variant='contained'
                  type='submit'
                >
                  Search
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Stack>
      <Box mt={10} height="100%">
        <Typography variant='subtitle1' align='right' mb={1}>
          Results {data?.characters.info.count || '0'}
        </Typography>
        <Grid container spacing={2}>
          {data?.characters.results.map((character) => (
            <Grid key={character.id} item xs={12} sm={6} md={4} lg={4} xl={4} p={0}>
              <CardCharacter character={character} />
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mb={2}>
            <Stack display="flex" alignItems="center">
              <Pagination
                count={data?.characters.info.pages}
                color='primary'
                className='pagination'
                page={page}
                onChange={handlePage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Home;
