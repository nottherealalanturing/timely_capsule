import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react';

const DurationTimer = ({ timer }) => {
  const [time, setTime] = timer;

  return (
    <Stack shouldWrapChildren direction="row">
      <NumberInput
        width={32}
        defaultValue={0}
        min={0}
        max={23}
        onChange={(valueString) =>
          setTime((e) => ({ ...e, hours: valueString }))
        }
        value={time['hours']}
      >
        <NumberInputField required />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <NumberInput
        width={32}
        defaultValue={0}
        min={0}
        max={59}
        onChange={(valueString) => {
          setTime((e) => ({ ...e, minutes: valueString }));
        }}
        value={time['minutes']}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
};

export default DurationTimer;
