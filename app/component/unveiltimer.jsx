import { Avatar, Box, Center, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

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

  const formattedDate = format(unveilingDate, 'MM/dd/yyyy');

  return (
    <Center>
      <Box textAlign="center" py={10} px={6} maxW="md">
        <Text fontSize="2xl" fontWeight="bold" py={{ base: 12, md: 30 }}>
          &ldquo;{messageData.title}&ldquo; by {messageData.sender}
        </Text>
        <Text fontSize="lg" color="gray.500" mt={2}>
          Will be unveiled on {formattedDate}
        </Text>

        <Text fontSize="2xl" color="teal.500" mt={4} fontWeight="bold">
          Countdown: {formatTime(timeRemaining)}
        </Text>

        <Avatar size="lg" name={messageData.sender} bg="gray.400" mt={6} />

        <Text fontSize="lg" color="gray.500" mt={4}>
          ⏳ Time is ticking! Prepare for the big reveal.
        </Text>
      </Box>
    </Center>
  );
};

export default UnveilTimer;
