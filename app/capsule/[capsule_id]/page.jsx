'use client';

import Countdown from '@/app/component/timeremaining';
import UnveilTimer from '@/app/component/unveiltimer';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaHourglassEnd } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ViewCapsulePage = ({ params }) => {
  const [messageData, setMessageData] = useState({});
  const [loading, setLoading] = useState(true);

  const formattedDeletionDate = new Date(
    messageData.deletionTime
  ).toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/craft/${params.capsule_id}`);
        const data = await response.json();
        setMessageData({ ...data });
      } catch (error) {
        console.error('Error generating ID:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.capsule_id]);

  if (loading) {
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
  }

  if (messageData.url === 0) {
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
  }

  if (new Date(messageData.unveilingDate) > Date.now()) {
    return <UnveilTimer messageData={messageData} />;
  }

  if (new Date(messageData.deletionTime) < Date.now()) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Icon as={FaHourglassEnd} boxSize={8} color="teal.500" mb={4} />

        <Heading as="h2" size="xl" mb={3}>
          Oops! This Timely Capsule Has Expired.
        </Heading>

        <Text fontSize="lg" color="gray.500" mb={6}>
          The moment has passed, and the time capsule you were looking for has
          completed its journey through time. It's now a relic of the past.
        </Text>

        <Text fontSize="sm" color="gray.500" mt={4}>
          🕰️ Time waits for no one, but there are always new adventures to
          explore!
        </Text>
      </Box>
    );
  }

  return (
    <Box p={8} maxW="xl" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          {messageData.title}
        </Heading>
        <Text color={'gray.500'}>
          {formattedDeletionDate} | ID: {messageData.url}
        </Text>
        <Divider />
        <Text color={'gray.800'} fontSize="lg">
          {messageData.content}
        </Text>
        <Divider />
        <Text color={'gray.500'}>
          This message will be deleted in{' '}
          <Countdown date={messageData.deletionTime} />
        </Text>
        <HStack spacing={4} align="center" justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{messageData.sender}</Text>
            <Text color={'gray.500'}>{formattedDeletionDate}</Text>
          </VStack>
          <Avatar size="md" name={messageData.sender} bg={'gray.500'} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ViewCapsulePage;
