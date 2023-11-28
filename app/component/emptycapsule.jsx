'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const EmptyCapsule = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
        py={{ base: 12, md: 30 }}
      >
        404
      </Heading>

      <Text fontSize="18px" mt={3} mb={2}>
        Oops! You&apos;ve stumbled upon a time portal malfunction!
      </Text>
      <Text color={'gray.500'} mb={6}>
        It appears the time capsule for this page hasn&apos;t been invented or
        perhaps, it&apos;s hiding in a different timeline.
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        as={Link}
        href={'/'}
      >
        Take a Quantum Leap Back to Home
      </Button>
    </Box>
  );
};

export default EmptyCapsule;
