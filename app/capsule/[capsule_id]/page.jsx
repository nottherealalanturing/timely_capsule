'use client';

import UnveilTimer from '@/app/component/unveiltimer';
import firebaseDateToJSDate from '@/app/utils/dateconverter';
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ViewCapsulePage = () => {
  // Sample data for the viewed message
  /*   const messageData = {
    title: 'A Timeless Journey',
    content:
      'Craft a timeless message that will transcend through time. Timely Capsule lets you send messages into the future, ensuring that your words arrive exactly when they matter most. From heartfelt notes to future self-reminders, each message is a timeless connection waiting to unfold.',
    sender: 'John Doe',
    date: 'December 1, 2023',
    uniqueID: 'ABC123',
    // Add a new field for the deletion time
    deletionTime: new Date('December 10, 2023 00:00:00 GMT').getTime(),
    unveilingDate: new Date('December 10, 2024 00:00:00 GMT').getTime(),
  }; */

  const messageData = {
    content: 'adkjadjkdk',
    deletionTime: new Date('2023-11-27T04:05:03.986Z'),
    sender: 'orange',
    title: 'is the name',
    unveilingDate: new Date('2022-12-01T03:05:03.000Z'),
    url: '2T3-gKrf',
  };

  // State to store the remaining time until deletion
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  // Function to calculate the remaining time until deletion
  function getTimeRemaining() {
    const now = new Date().getTime();
    const timeRemaining = messageData.deletionTime - now;
    return Math.max(0, timeRemaining);
  }

  // Update the time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Format milliseconds into a readable time format
  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }

  return messageData.unveilingDate > Date.now() ? (
    <UnveilTimer />
  ) : (
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
          {messageData.deletionTime.toLocaleDateString()} | ID:{' '}
          {messageData.url}
        </Text>
        <Divider />
        <Text color={'gray.800'} fontSize="lg">
          {messageData.content}
        </Text>
        <Divider />
        <Text color={'gray.500'}>
          This message will be deleted in {formatTime(timeRemaining)}
        </Text>
        <HStack spacing={4} align="center" justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{messageData.sender}</Text>
            <Text color={'gray.500'}>{messageData.date}</Text>
          </VStack>
          <Avatar
            size="md"
            name={messageData.sender}
            src="https://bit.ly/dan-abramov"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ViewCapsulePage;
