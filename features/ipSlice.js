import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ips: [],
};

export const ipSlice = createSlice({
	name: "ips",
	initialState,
	reducers: {
		addBoard: (state, action) => {
			const index = state.boards.findIndex((item) => item.chipId === action.payload.chipId);

			let newBoards = [...state.boards];

			if (index >= 0) {
				newBoards.splice(index, 1, action.payload);
				console.log("updating existing board");
			} else {
				console.log("adding new board.");
				// TODO: check if new board is correctly formatted.
				console.log(action.payload);
				newBoards.push(action.payload);
			}

			state.boards = newBoards;
		},
		removeBoard: (state, action) => {
			const index = state.boards.findIndex((item) => item.chipId === action.payload);

			let newBoards = [...state.boards];

			if (index >= 0) {
				newBoards.splice(index, 1);
			} else {
				console.warn(
					`Can't remove board (chipId: ${action.payload}) as the board is not in the container.`
				);
			}

			state.boards = newBoards;
		},
		updateIpOfBoard: (state) => {
			console.log("updating board.");
		},
	},
});

// Action creators are generated for each case reducer function
export const { addBoard, removeBoard, updateIpOfBoard } = ipSlice.actions;

export const selectBoards = (state) => state.board.boards;

export default ipSlice.reducer;
