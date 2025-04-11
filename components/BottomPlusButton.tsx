import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BottomPlusButton = ({ onPress }: { onPress: () => void; }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <AntDesign name="plus" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -25 }],
    },
    button: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 3,
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
    },
});

export default BottomPlusButton;