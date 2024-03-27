import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosClient } from "../../config/axios";
import { apiConstants } from "../../config/apiConstants";



const initialState = {
    isLoading: false,
    isGetLoading: false,
    curPage: 1,
    totalPages: undefined,
    feedList: [],
    error: ''
}

const FEED = "FEED";

export const add_feed_data = createAsyncThunk(
    FEED + "/add_feed",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(apiConstants.ADD_FEED, params);
            return response.data;
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message);
            }
            return rejectWithValue(e?.response);
        }
    }
);

export const get_feed_data = createAsyncThunk(
    FEED + "/get_feed",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(apiConstants.ADD_FEED, { params });
            return response.data;
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message);
            }
            return rejectWithValue(e?.response);
        }
    }
);

export const add_like = createAsyncThunk(
    FEED + "/add_like",
    async (postID, { rejectWithValue }) => {
        try {
            const response = await axiosClient.patch(`${apiConstants.ADD_LIKES}${postID}`);
            return response.data;
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                Alert.alert(e.message);
            }
            return rejectWithValue(e?.response);
        }
    }
);

export const FeedSlice = createSlice({
    name: FEED,
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(add_feed_data.pending, (state) => {
            state.isLoading = true
            state.error = ''
        });
        builder.addCase(add_feed_data.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        });
        builder.addCase(add_feed_data.rejected, (state, action) => {
            state.isLoading = false
            state.error = ''
        });

        builder.addCase(get_feed_data.pending, (state) => {
            state.isGetLoading = true
            state.error = ''
        });
        builder.addCase(get_feed_data.fulfilled, (state, action) => {
            state.isGetLoading = false
            state.feedList =
                action.meta.arg.page == 1 ?
                    action.payload.data.feedList
                    : [
                        ...state?.feedList,
                        ...action.payload.data.feedList,
                    ]
            state.curPage = Number(action.payload.data.currentPage)
            state.totalPages = Number(action.payload.data.totalPages)
            state.error = ''
        });
        builder.addCase(get_feed_data.rejected, (state, action) => {
            state.isGetLoading = false
            state.error = ''
        });
    },
})


export const { } = FeedSlice.actions;
export default FeedSlice.reducer;
