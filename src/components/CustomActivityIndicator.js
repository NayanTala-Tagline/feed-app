import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';



const CustomActivityIndicator = (props) => {
    return (
        <ActivityIndicator
            {...props}
            color={colors.BLACK}
            style={[styles.indicatorStyle, props]}
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