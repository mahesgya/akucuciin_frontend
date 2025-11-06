import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: {
		latitude: null,
		longitude: null,
	},
	loadingLocation: false,
	errorLocation: null,
};

const locationSlice = createSlice({
	name: "location",
	initialState,

	reducers: {
		setLocation: (state, action) => {
			state.data.latitude = action.payload.latitude;
			state.data.longitude = action.payload.longitude;
			state.loadingLocation = false;
			state.errorLocation = null;
		},

		fetchLocationStart: (state) => {
			state.loadingLocation = true;
		},

		fetchLocationError: (state, action) => {
			state.loadingLocation = false;
			state.errorLocation = action.payload;
		},

		clearLocation: (state) => {
			state.data.latitude = null;
			state.data.longitude = null;
			state.loadingLocation = false;
			state.errorLocation = null;
		},
	},
});

export const {
	setLocation,
	fetchLocationStart,
	fetchLocationError,
	clearLocation,
} = locationSlice.actions;

export default locationSlice.reducer;
