import { Avatar, Box, Center, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../../public/logo.png';

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

const UnveilTimer = ({ messageData }) => {
  const [unveilingDate, setUnveilingDate] = useState(
    new Date(messageData.unveilingDate)
  );
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    setUnveilingDate(new Date(messageData.unveilingDate));
  }, [messageData.unveilingDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(
        Math.max(0, unveilingDate.getTime() - new Date().getTime())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [unveilingDate]);

  const formattedDate = format(unveilingDate, 'MM/dd/yyyy hh:mm');

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={{ base: '90%', md: 'full' }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        justifyContent={'center'}
        alignContent="center"
      >
        <Box
          h={'50px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        ></Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            ID: {messageData.url}
          </Text>

          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {messageData.title}
          </Heading>
          <Text color={'gray.500'} fontWeight={600}>
            Mark your calendar for {messageData.sender}&apos;s message,
            scheduled to be revealed on {formattedDate}.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar name={messageData.sender} bg={'gray.500'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text color={'gray.500'} fontWeight={700}>
              countdown: {formatTime(timeRemaining)}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default UnveilTimer;
