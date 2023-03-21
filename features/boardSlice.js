import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	boards: [],
};

export const boardSlice = createSlice({
	name: "board",
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

		updateIpOfBoard: (state, action) => {
			console.log("updating ip of board.");
			const index = state.boards.findIndex((item) => item.chipId === action.payload);

			let newBoards = [...state.boards];

			if (index >= 0) {
				newBoards[index].name = newBoards[index].name + "$";
			} else {
				console.warn(
					`Can't update board (chipId: ${action.payload}) as the board is not in the container.`
				);
			}

			state.boards = newBoards;
		},

		updateDeviceStateOfBoard: (state, action) => {
			const index = state.boards.findIndex((item) => item.chipId === action.payload.chipId);

			let newBoards = [...state.boards];

			if (index >= 0) {
				// console.log(
				// 	"updating State of Board. From:",
				// 	newBoards[index].deviceState,
				// 	"To:",
				// 	action.payload.deviceState
				// );
				newBoards[index].deviceState = action.payload.deviceState;
			} else {
				console.warn(
					`Can't update board (chipId: ${action.payload}) as the board is not in the container.`
				);
			}

			state.boards = newBoards;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addBoard, removeBoard, updateIpOfBoard, updateDeviceStateOfBoard } =
	boardSlice.actions;

export const selectBoards = (state) => state.board.boards;
export const selectBoardsByChipId = (state, chipId) =>
	state.board.boards.filter((board) => board.chipId == chipId);

export default boardSlice.reducer;
