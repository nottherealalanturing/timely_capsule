import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>

      <Text fontSize="18px" mt={3} mb={2}>
        Time Capsule Missing!
      </Text>
      <Text color={'gray.500'} mb={6}>
        Oops! It seems the time capsule for this page hasn&apos;t been created
        yet.
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        as={Link}
        href={'/'}
      >
        Journey Back to Home
      </Button>
    </Box>
  );
}
