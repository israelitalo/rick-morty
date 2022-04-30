import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import {
  Box, Card, CardMedia, Chip, CircularProgress, Container, Divider, Paper, Stack, Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import api from '../../api';
import LogoImg from '../../assets/images/Rick_and_Morty_logo.svg';
import { characterType } from '../../types/character';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  image: {
    transition: 'transform .3s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
}));

const PageCharacterDetail: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const classes = useStyles();

  const { isLoading, data } = useQuery(
    ['characters'],
    async () =>
      await api.get<characterType>(`/character/${id}`),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: Boolean(id)
    }
  );

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="center" my={3}>
        <Image src={LogoImg} height="150" width="500" alt='Logo' />
      </Box>

      {isLoading && !data &&
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress color='primary' size={50} />
        </Box>
      }

      {data?.data && !isLoading &&
        <Box gap={2} mb={5} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <Typography variant='h4' textAlign="center" mb={2}>
            {data.data?.name}
          </Typography>

          <Card component={Box} width={250}>
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              className={classes.image}
              image={data.data?.image}
              alt={data.data?.name}
            />
          </Card>

          <Paper elevation={5} component={Box} p={2} width="100%">
            <Stack direction="column" gap={2}>
              <Typography variant="body1" color="text.secondary">
                Origin:
              </Typography>

              <Typography variant="body2" color="text.primary">
                {data.data.origin?.name || 'unknown'}
              </Typography>

              <Divider />

              <Typography variant="body1" color="text.secondary">
                Location:
              </Typography>

              <Typography variant="body2" color="text.primary">
                {data.data.location?.name || 'unknown'}
              </Typography>

              <Divider />

              <Typography variant="body1" color="text.secondary">
                Episodes:
              </Typography>

              <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                {data.data.episode.map(episode => (
                  <Chip key={episode} label={episode} color='primary' size="small" />
                ))}
              </Stack>

            </Stack>
          </Paper>
        </Box>
      }

    </Container>
  );
};

export default PageCharacterDetail;
