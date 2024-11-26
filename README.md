# Hotspot Device Scanner

A React Native app that scans and displays the IP addresses of devices connected to the mobile hotspot of the user's Android phone.

---

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1: Start the Metro Server

Run the following command to start **Metro**, the JavaScript bundler that ships with React Native:

```bash
# using npm
npm start

# OR using Yarn
yarn start


Code Overview
1. React Native Code (JavaScript)
We use @react-native-community/netinfo to get the mobile device's IP address.
useState is used to manage the state of the connected devices list and the device's own IP address.
The button allows users to scan connected devices and the app displays a list of IP addresses of devices connected to the hotspot.
Manual scan: Users can trigger a manual scan for connected devices by pressing the "Scan Connected Devices" button.
UI Components: The app displays a simple UI with a list of connected devices and the IP address of the mobile device.
2. Native Android Code (Kotlin)
The app uses native Kotlin code to read the ARP table from the Android system to find the connected devices' IP addresses. This is achieved by the following modifications:

ARP Table Access: The ARPScannerModule.kt class accesses the ARP table located at /proc/net/arp to identify devices connected to the mobile hotspot.
Native Module: The ARPScannerModule is a native module that is registered in ARPScannerPackage.kt to bridge between JavaScript and the Android native code.
Permissions: The app requests necessary permissions (ACCESS_FINE_LOCATION, ACCESS_WIFI_STATE, ACCESS_NETWORK_STATE) for reading network and hotspot data.
Modifications We Made
Added Native Android Module: We created a native module in Kotlin (ARPScannerModule.kt) to interact with the ARP table and fetch the IP addresses of connected devices.
Network Permission Handling: We handled Android permissions related to network access and location in both JavaScript and Kotlin.
UI Development: The app's UI was created with React Native components, allowing for easy interaction to scan and list connected devices.
Error Handling: We implemented basic error handling to show alerts if there is an issue fetching the connected devices' IP addresses.
Manual Scanning: We added the ability to manually scan for connected devices via a button press. The app displays connected IPs in a FlatList.
```
