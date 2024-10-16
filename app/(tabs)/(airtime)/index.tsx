import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const Airtime = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#FFFFFF] dark:bg-primary-dark flex-1"
    >
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Airtime