import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { add_feed_data } from '../redux/slices/FeedSlice'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { useNavigation } from '@react-navigation/native'
import Colors from '@/constants/Colors'
import FontSizes from '@/constants/FontSizes'
import { ImagesPath } from '@/constants/ImagePaths';
import { router } from 'expo-router';

interface ImageState {
    name: any;
    type: any; // Assuming str.mimeType is a string type
    uri: any;
}

// Set initial state with the defined interface
const initialImageState: ImageState = {
    name: '',
    type: '',
    uri: '',
};


const AddFeed = () => {
    const navigation = useNavigation()
    const [selectedImage, setselectedImage] = useState<any>()
    const [caption, setCaption] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.feed)

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            let imageProps = result.assets[0]
            const parts = imageProps.uri.split('/');
            const fileName = parts[parts.length - 1];
            let imageData = {
                name: fileName,
                type: imageProps.mimeType,
                uri: imageProps.uri
            }
            setselectedImage(imageData)
        } else {
            alert('You did not select any image.');
        }
    };

    const onAddPost = () => {
        const data: any = new FormData()
        data.append("file", selectedImage);
        data.append("username", username);
        data.append("caption", caption);
        dispatch(add_feed_data(data)).unwrap().then((res) => {
            router.push('/FeedList')
            setUsername('')
            setCaption('')
            setselectedImage({})
        }).catch((e) => {

        })
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            {isLoading ?
                <CustomActivityIndicator size={'large'} /> :
                <ScrollView contentContainerStyle={styles.mainContainer} keyboardShouldPersistTaps='handled' bounces={false}>
                    <View style={styles.mainContainer}>
                        <TouchableOpacity onPress={() => router.push('/FeedList')}>
                            <Image style={styles.listImg} source={ImagesPath.list_icon} />
                        </TouchableOpacity>
                        <View style={styles.container}>
                            {selectedImage !== '' ?
                                <View>
                                    <TouchableOpacity style={[styles.addPostRound, styles.editPostRound]}
                                        onPress={pickImageAsync}>
                                        <Image style={styles.addImg} source={ImagesPath.edit_icon} />
                                    </TouchableOpacity>
                                    <ImageBackground style={styles.imageCard} source={{ uri: selectedImage?.uri }}>
                                    </ImageBackground>
                                </View>
                                : <View style={styles.imageCard}>
                                    <TouchableOpacity style={styles.addPostRound} onPress={pickImageAsync}>
                                        <Image style={styles.addImg} source={ImagesPath.add_icon} />
                                    </TouchableOpacity>
                                </View>}

                            <View style={styles.txtInputContainer}>
                                <TextInput placeholder='Add caption here...'
                                    onChangeText={(caption) => setCaption(caption)}
                                    style={styles.inputTextStyle} />
                            </View>
                            <View style={styles.txtInputContainer}>
                                <TextInput placeholder='Add username here...'
                                    onChangeText={(uname) => setUsername(uname)}
                                    style={styles.inputTextStyle} />
                            </View>
                            <TouchableOpacity style={[styles.btnContainer, { backgroundColor: selectedImage == '' ? 'gray' : Colors.BLUE }]}
                                onPress={() => onAddPost()}
                                disabled={selectedImage == ''}>
                                <Text style={styles.addPostStyle}>Add Post</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView >
    )
}

export default AddFeed

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: wp(10),
        paddingHorizontal: wp(5)
    },
    imageCard: {
        backgroundColor: Colors.LIGHT_GRAY,
        height: wp(40),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    addPostStyle: {
        fontSize: FontSizes.MEDIUM_17,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    addPostRound: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10),
    },
    editPostRound: {
        zIndex: 999,
        marginBottom: wp(-6),
        alignSelf: 'flex-end',
        marginRight: wp(-4)
    },
    listImg: {
        width: wp(6), height: wp(6),
        resizeMode: 'contain',
        alignSelf: 'flex-end', marginHorizontal: wp(4)
    },
    addImg: {
        width: wp(4), height: wp(4)
    },
    btnContainer: {
        backgroundColor: Colors.BLUE,
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        paddingVertical: wp(2),
        marginVertical: wp(10)
    },
    txtInputContainer:
    {
        backgroundColor: Colors.LIGHT_GRAY,
        borderColor: Colors.BLACK,
        borderWidth: wp(0.1),
        borderRadius: wp(2),
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        marginVertical: wp(3)
    },
    inputTextStyle: {
        backgroundColor: '#DBDEE5',
        fontSize: FontSizes.EXTRA_SMALL_12,
        borderRadius: wp(2),
        color: Colors.BLACK
    }


})