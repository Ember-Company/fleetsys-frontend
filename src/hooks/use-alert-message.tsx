import React, { useState } from 'react';
import { Alert, type AlertProps } from '@mui/material';

interface UseAlertMessageReturn {
  AlertMessage: React.ComponentType;
  updateAlertMessage: (message: AlertMessage | null) => void;
}

interface UseAlertProps {
  props?: AlertProps;
}

interface AlertMessage {
  text: string;
  isError: boolean;
}

export default function useAlertMessage(props: UseAlertProps = {}): UseAlertMessageReturn {
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

  const updateAlertMessage = (message: AlertMessage | null): void => {
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  function AlertMessage(): React.JSX.Element {
    return (
      <>
        {alertMessage ? (
          <Alert {...props} color={alertMessage.isError ? 'error' : 'success'}>
            {alertMessage.text}
          </Alert>
        ) : null}
      </>
    );
  }

  return {
    AlertMessage,
    updateAlertMessage,
  };
}
