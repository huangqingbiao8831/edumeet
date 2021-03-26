const initialState =
{
	files       : [],
	count       : 0,
	countUnread : 0
};

const files = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'ADD_FILE':
		{
			const { peerId, magnetUri, time } = action.payload;

			const file = {
				type      : 'file',
				time      : time ? time : Date.now(),
				active    : false,
				progress  : 0,
				files     : null,
				peerId    : peerId,
				magnetUri : magnetUri
			};

			return {
				...state,
				files       : [ ...state.files, file ],
				count       : state.count + 1,
				countUnread : file.sender === 'response' ? ++state.countUnread : state.countUnread

			};
		}

		case 'ADD_FILE_HISTORY':
		{
			const { fileHistory } = action.payload;

			const newFileHistory = [];

			fileHistory.forEach((file) =>
			{
				newFileHistory.push({
					type     : 'file',
					active   : false,
					progress : 0,
					files    : null,
					...file
				});
			});

			return {
				...state,
				files : newFileHistory,
				count : newFileHistory.length
			};
		}

		case 'SET_FILE_ACTIVE':
		{
			const { magnetUri } = action.payload;

			state.files.forEach((item, index) =>
			{
				if (item.magnetUri === magnetUri)
				{
					state.files[index].active = true;
				}
			});

			return { ...state };
		}

		case 'SET_FILE_INACTIVE':
		{
			const { magnetUri } = action.payload;

			state.files.forEach((item, index) =>
			{
				if (item.magnetUri === magnetUri)
				{
					state.files[index].active = false;
				}
			});

			return { ...state };
		}

		case 'SET_FILE_PROGRESS':
		{
			const { magnetUri, progress } = action.payload;

			state.files.forEach((item, index) =>
			{
				if (item.magnetUri === magnetUri)
				{
					state.files[index].progress = progress;
				}
			});

			return { ...state };
		}

		case 'SET_FILE_DONE':
		{
			const { magnetUri, sharedFiles } = action.payload;

			state.files.forEach((item, index) =>
			{
				if (item.magnetUri === magnetUri)
				{
					state.files[index] = {
						...item,
						files    : sharedFiles,
						progress : 1,
						// type : 'file',
						// time : Date.now(),
						active   : false,
						timeout  : false
					};
				}
			});

			return { ...state };
		}

		case 'CLEAR_FILES':
		{
			// return [];
			return {
				...state,
				files       : [],
				count       : 0,
				countUnread : 0
			};

		}
		default:
			return state;
	}
};

export default files;
