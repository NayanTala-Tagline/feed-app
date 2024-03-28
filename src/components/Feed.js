import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontSizes from '../styles/fontSizes'
import { colors } from '../styles/colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/imagePaths'

const Feed = (props) => {
    (props?.imageUrls)
    return (
        <View style={styles.container}>
            {props?.imageUrls?.length > 0 &&
                <ImageBackground source={{ uri: props?.imageUrls[0] }} style={styles.imageCard}>
                    <TouchableOpacity style={styles.countContainer} onPress={() => props?.addlikes(props?._id)}>
                        <Image source={ImagesPath.like_icon} style={styles.likeImage} />
                        <Text style={styles.countTxt}>{props?.likes}</Text>
                    </TouchableOpacity>

                </ImageBackground>}
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
        backgroundColor: colors.LIGHT_GRAY,
        height: wp(40),
        borderRadius: wp(2),
        alignItems: 'center',
        overflow: 'hidden',
        resizeMode: 'cover'
    },
    username: {
        fontSize: FontSizes.SMALL_14,
        fontWeight: '700',
        color: colors.BLACK,
        marginTop: wp(1)
    },
    caption: {
        fontSize: FontSizes.SMALL_14,
        fontWeight: '400',
        color: colors.BLACK
    },
    likeImage: {
        width: wp(8),
        height: wp(8),
        resizeMode: 'contain'
    },
    countTxt: {
        fontSize: FontSizes.EXTRA_SMALL_12,
        fontWeight: '400',
        color: colors.BLACK,
        marginHorizontal: wp(1)
    },
    countContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: colors.WHITE,
        borderRadius: wp(6), alignItems: 'center',
        padding: wp(0.5),
        margin: wp(2)
    }


})