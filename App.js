import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [deviceIP, setDeviceIP] = useState('');

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setDeviceIP(state.details.ipAddress || 'N/A');
    });

    if (Platform.OS === 'android') {
      requestAndroidPermissions();
    } else {
      Alert.alert(
        'Notice',
        'Scanning connected devices is not supported on iOS. This app focuses on Android functionality.',
      );
    }
  }, []);

  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Location permission is required to scan connected devices.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanDevices = async () => {
    if (Platform.OS === 'android') {
      try {
        const devices = await NativeModules.ARPScanner.getConnectedDevices();
        setConnectedDevices(devices);
      } catch (error) {
        console.error('Error scanning devices:', error);
        Alert.alert('Error', 'Failed to scan connected devices.');
      }
    } else {
      Alert.alert(
        'Unsupported',
        'Device scanning is not supported on iOS due to platform restrictions.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotspot Device Scanner</Text>
      <Text style={styles.subtitle}>Your Device IP: {deviceIP}</Text>
      <Button title="Scan Connected Devices" onPress={scanDevices} />
      <FlatList
        data={connectedDevices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.device}>{item}</Text>}
        ListEmptyComponent={
          <Text style={styles.noDevices}>No Devices Found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 24, marginBottom: 10, textAlign: 'center'},
  subtitle: {fontSize: 16, marginBottom: 20, textAlign: 'center'},
  device: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noDevices: {fontSize: 16, textAlign: 'center', marginTop: 20, color: '#888'},
});

export default App;
