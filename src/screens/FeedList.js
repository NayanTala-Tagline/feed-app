import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { add_like, get_feed_data } from '../redux/slices/FeedSlice'
import FontSizes from '../styles/fontSizes'
import { colors } from '../styles/colors'
import Feed from '../components/Feed'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const FeedList = () => {
    const dispatch = useAppDispatch()
    const { feedList, isGetLoading, curPage, totalPages } = useAppSelector(state => state.feed)
    const [isFooterLoading, setIsFooterLoading] = useState(false)

    useEffect(() => {
        ({ feedListttttt: feedList, isGetLoading, curPage, totalPages })

        _getFeedData(1)
    }, [])

    const _getFeedData = (page) => {
        let params = {
            page: page,
            limit: 10
        }
        dispatch(get_feed_data(params)).unwrap().then((res) => {
            setIsFooterLoading(false)
        }).catch(e => {
            setIsFooterLoading(false)
        })
    }

    const addlikes = (id) => {
        dispatch(add_like(id)).unwrap().then((res) => {
            setIsFooterLoading(false)
            _getFeedData(1)
        }).catch(e => {
            setIsFooterLoading(false)
        })
    }
    const renderItem = ({ item }) => {
        return (
            <Feed {...{ ...item, addlikes }} />
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            {isGetLoading && !isFooterLoading ? <CustomActivityIndicator size={'large'} /> : <View style={styles.mainContainer}>
                <Text style={styles.title}>Feed</Text>
                <FlatList
                    style={{ flex: 1 }}
                    data={feedList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListFooterComponent={() => {
                        return (
                            isFooterLoading &&
                            totalPages !== curPage && (
                                <ActivityIndicator size={'small'} color={colors.BLACK} />
                            )
                        );
                    }}
                    onEndReached={() => {
                        if (!isFooterLoading && totalPages !== curPage) {
                            setIsFooterLoading(true)
                            _getFeedData(curPage + 1)
                        }
                    }}
                    onEndReachedThreshold={0.1} />

            </View>}
        </SafeAreaView>
    )
}

export default FeedList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    title: {
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.BLACK,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})