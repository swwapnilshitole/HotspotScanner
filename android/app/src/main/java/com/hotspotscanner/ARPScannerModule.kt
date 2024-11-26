package com.hotspotdevicescanner

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.BufferedReader
import java.io.FileReader

class ARPScannerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ARPScanner"
    }

    @ReactMethod
    fun getConnectedDevices(promise: Promise) {
        val devices = mutableListOf<String>()

        try {
            val bufferedReader = BufferedReader(FileReader("/proc/net/arp"))
            var line: String?

            while (bufferedReader.readLine().also { line = it } != null) {
                val parts = line!!.split(Regex("\\s+"))
                if (parts.size >= 4) {
                    val ipAddress = parts[0]
                    val macAddress = parts[3]
                    if (macAddress != "00:00:00:00:00:00") {
                        devices.add(ipAddress)
                    }
                }
            }

            bufferedReader.close()
            promise.resolve(devices)
        } catch (e: Exception) {
            promise.reject("ARP_READ_ERROR", e)
        }
    }
}
