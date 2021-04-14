import { combineReducers } from "redux";
import authentication from "./authentication"
import investments from "./investments"


export default combineReducers({
    authentication,
    investments
});
