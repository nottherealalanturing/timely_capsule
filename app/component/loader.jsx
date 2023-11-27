'use client';

import { Box, Heading, Spinner, Text } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        🚀
      </Heading>

      <Text fontSize="18px" mt={3} mb={2}>
        Fetching Your Time Capsule...
      </Text>
      <Text color={'gray.500'} mb={6}>
        Patience, time traveler! Our quantum servers are working hard to
        retrieve your precious moments from the space-time continuum.
      </Text>

      <Spinner size="xl" color="teal.500" />

      <Text fontSize="sm" color={'gray.500'} mt={4}>
        Just a moment in the time stream...
      </Text>
    </Box>
  );
};

export default Loader;
