import { StyleSheet, Text, View } from 'react-native';
import { socket } from './socket';
import { useEffect, useState } from 'react';
import { Row, Column, Title, useTheme } from '@theme/global';

export default function Connect() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const { color, font, margin } = useTheme();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <Column>
        <Column style={{ width: 18, height: 18, borderWidth: 2, borderColor: '#fff', borderRadius: 100, backgroundColor: isConnected ? color.blue : color.yellow,  marginRight: 4, }} />
    </Column>
  );
}
