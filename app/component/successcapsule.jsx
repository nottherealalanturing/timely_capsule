'use client';

import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import { useState } from 'react';

export default function CapsuleCreatedPage({ capsuleUrl }) {
  const [sendMail, setSendMail] = useState(false);
  const [email, setEmail] = useState('');
  const PATHNAME = `localhost:3000/capsule/${capsuleUrl}`;

  const message = {
    from: 'timely@capsule.com',
    user_email: email,
    message: PATHNAME,
  };

  const handleSendEmail = () => {
    emailjs
      .send('service_4hzn6qr', 'template_iby7ho9', message, 'gOyHyH8Gv_6BZlNwF')
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          setEmail('');
          setSendMail(true);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <Center>
      <Box textAlign="center" py={10} px={6} maxW="md">
        <Heading as="h2" size="xl" mb={3}>
          Congratulations!
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={6}>
          You&apos;ve successfully created a time capsule.
        </Text>

        {/* Display the capsule URL */}
        <Stack direction="column" align="center" mb={6}>
          <Text fontWeight="bold" color="teal.500">
            Your Time Capsule URL:
          </Text>
          <Text
            color="teal.500"
            mb={4}
            as={Link}
            href={`/capsule/${capsuleUrl}`}
          >
            {capsuleUrl}
          </Text>
        </Stack>

        {sendMail ? (
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
        ) : (
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
        )}
      </Box>
    </Center>
  );
}
