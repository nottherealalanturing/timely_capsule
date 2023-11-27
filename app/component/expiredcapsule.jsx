'use client';

import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { FaHourglassEnd } from 'react-icons/fa';

const ExpiredCapsule = () => {
  return (
    <Box textAlign="center" px={6} py={{ base: 12, md: 30 }}>
      <Icon as={FaHourglassEnd} boxSize={8} color="teal.500" mb={4} />

      <Heading as="h2" size="xl" mb={3}>
        Oops! This Timely Capsule Has Expired.
      </Heading>

      <Text fontSize="lg" color="gray.500" mb={6}>
        The moment has passed, and the time capsule you were looking for has
        completed its journey through time. It&apos;s now a relic of the past.
      </Text>

      <Text fontSize="sm" color="gray.500" mt={4}>
        Time waits for no one, but there are always new adventures to explore!
      </Text>
    </Box>
  );
};

export default ExpiredCapsule;
