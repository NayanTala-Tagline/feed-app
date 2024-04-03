import Colors from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface CustomIndicatorProps {
    indicatorStyle?: StyleProp<ViewStyle>
}

const CustomActivityIndicator = (indicatorProps: ActivityIndicatorProps & CustomIndicatorProps) => {
    return (
        <ActivityIndicator
            {...indicatorProps}
            color={Colors.BLACK}
            style={[styles.indicatorStyle, indicatorProps.indicatorStyle]}
        />
    )
}

export default CustomActivityIndicator;

const styles = StyleSheet.create({
    indicatorStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999999999999999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})