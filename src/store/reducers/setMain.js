
const initialState = {
    currentUser:null,
    editProfile:null,
    groupInfo:null,
    groupEdit:null,
    notificationStatus:'not set',
    updateComponent:false,
    preloader: false
};
export const main = "MAINDATA";
const mainData = (state = initialState, action) => {
    switch(action.type){
        case "MAINDATA" :
        return {
            ...state,
            ...action.info
        }
    }
    return state;
};
export default mainData;