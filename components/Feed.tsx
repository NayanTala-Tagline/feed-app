import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontSizes from '@/constants/FontSizes'
import Colors from '@/constants/Colors'
import { ImagesPath } from '@/constants/ImagePaths'
import LottieView from 'lottie-react-native'

const Feed = (props: any) => {
    const [isStart, setIsStart] = useState(false)

    const startAnim = () => {
        setIsStart(true)
        setTimeout(() => {
            setIsStart(false)
        }, 1000);
    }
    return (
        <View style={styles.container}>
            {props?.imageUrls?.length > 0 &&
                <>
                    {isStart && <LottieView
                        autoPlay={true}
                        style={styles.lottie}
                        source={require('../assets/images/likes.json')}
                    />}
                    <ImageBackground source={{ uri: props?.imageUrls[0] }} style={styles.imageCard}>

                        <TouchableOpacity style={styles.countContainer} onPress={() => {
                            props?.addlikes(props?._id)
                            startAnim()
                        }}>
                            <Image source={ImagesPath.like_icon} style={styles.likeImage} />
                            <Text style={styles.countTxt}>{props?.likes}</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </>

            }
            {(props?.username || props?.caption) && <Text style={styles.username}>{props?.username}
                <Text style={styles.caption}> {props?.caption}</Text>
            </Text>}
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(3),
        marginVertical: wp(2)
    },
    row: {
        flexDirection: 'row',
    },
    imageCard: {
        backgroundColor: Colors.LIGHT_GRAY,
        height: wp(40),
        borderRadius: wp(2),
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        resizeMode: 'cover'
    },
    username: {
        fontSize: FontSizes.SMALL_14,
        fontWeight: '700',
        color: Colors.BLACK,
        marginTop: wp(1)
    },
    caption: {
        fontSize: FontSizes.SMALL_14,
        fontWeight: '400',
        color: Colors.BLACK
    },
    likeImage: {
        width: wp(8),
        height: wp(8),
        resizeMode: 'contain'
    },
    countTxt: {
        fontSize: FontSizes.EXTRA_SMALL_12,
        fontWeight: '400',
        color: Colors.BLACK,
        marginHorizontal: wp(1)
    },
    countContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        borderRadius: wp(6),
        alignItems: 'center',
        padding: wp(0.5),
        margin: wp(2)
    },
    lottie: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 10,
        zIndex: 9999,
        bottom: 75
    }


})