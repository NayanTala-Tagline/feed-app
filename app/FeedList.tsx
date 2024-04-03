import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { add_like, feed_likes_Reducer, get_feed_data } from '../redux/slices/FeedSlice'

import Feed from '../components/Feed'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import Colors from '@/constants/Colors'
import FontSizes from '@/constants/FontSizes'

const FeedList = () => {
    const dispatch = useAppDispatch()
    const { feedList, isGetLoading, curPage, totalPages } = useAppSelector(state => state.feed)
    const [isFooterLoading, setIsFooterLoading] = useState(false)

    useEffect(() => {
        _getFeedData(1)
    }, [])

    const _getFeedData = (page: any) => {
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

    const addlikes = (id: string) => {
        dispatch(add_like(id)).unwrap().then((res) => {
            let tempFeedList = [...feedList]
            let finalItem = tempFeedList.map((item, index) => {
                if (item._id == id) {
                    return {
                        ...item,
                        likes: item.likes + 1
                    }
                } else {
                    return item
                }

            })
            dispatch(feed_likes_Reducer(finalItem))
        }).catch(e => {
        })
    }
    const renderItem = ({ item }: any) => {
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
                                <ActivityIndicator size={'small'} color={Colors.BLACK} />
                            )
                        );
                    }}
                    onEndReached={() => {
                        if (!isFooterLoading && totalPages !== curPage) {
                            setIsFooterLoading(true)
                            _getFeedData(curPage + '1')
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
        color: Colors.BLACK,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})