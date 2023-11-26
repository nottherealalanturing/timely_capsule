import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function CapsuleCreatedPage({ capsuleUrl }) {
  // State for the email input
  const [email, setEmail] = useState('');

  // Function to handle sending the capsule URL via email
  const handleSendEmail = () => {
    // Implement your logic for sending the email
    console.log(`Sending capsule URL ${capsuleUrl} to ${email}`);
    // Reset the email input after sending
    setEmail('');
  };

  return (
    <Center>
      <Box textAlign="center" py={10} px={6} maxW="md">
        {/* Congratulatory message */}
        <Heading as="h2" size="xl" mb={3}>
          Congratulations!
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={6}>
          You've successfully created a time capsule.
        </Text>

        {/* Display the capsule URL */}
        <Stack direction="column" align="center" mb={6}>
          <Text fontWeight="bold" color="teal.500">
            Your Time Capsule URL:
          </Text>
          <Text color="teal.500" mb={4}>
            {capsuleUrl}
          </Text>
        </Stack>

        {/* Form-like element to send the capsule URL via email */}
        <Stack direction="column" align="center">
          <Text fontWeight="bold" mb={2}>
            Send your capsule URL via email:
          </Text>
          <Input
            type="email"
            placeholder="Enter recipient's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            onClick={handleSendEmail}
          >
            Send Email
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
