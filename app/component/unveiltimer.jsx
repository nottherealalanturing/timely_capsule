import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Avatar,
} from '@chakra-ui/react';

const UnveilTimer = () => {
  // Sample data for the viewed message
  const messageData = {
    title: 'A Timeless Journey',
    content:
      'Craft a timeless message that will transcend through time. Timely Capsule lets you send messages into the future, ensuring that your words arrive exactly when they matter most. From heartfelt notes to future self-reminders, each message is a timeless connection waiting to unfold.',
    sender: 'John Doe',
    date: 'December 10, 2023 12:00:00 GMT',
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const unveilingTime = new Date(messageData.date).getTime();
    const timeRemaining = unveilingTime - now;
    return Math.max(0, timeRemaining);
  }

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

  return (
    <Box p={8} maxW="xl" mx="auto">
      <VStack spacing={8} align="center">
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          lineHeight={'110%'}
          color="green.400"
          mt="100px"
        >
          {messageData.title}
        </Heading>
        <VStack spacing={1} align="center">
          <Text fontWeight="bold" fontSize="lg" color="gray.600">
            {messageData.sender}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Scheduled for {messageData.date}
          </Text>
        </VStack>
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Countdown: {formatTime(timeRemaining)}
        </Text>
        <Avatar
          size="lg"
          name={messageData.sender}
          src="https://bit.ly/dan-abramov"
        />
      </VStack>
    </Box>
  );
};

export default UnveilTimer;
