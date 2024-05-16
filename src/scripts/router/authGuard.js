import { isLoggedIn } from "../api/auth/auth.js";
import { renderView} from "../ui/renderView.js";
import * as views from "../views/index.js";
import { updateNavigation } from "../ui/navigation.js";

export const authGuard = (callback) => {
    if (!isLoggedIn()) {
        renderView(views.loginPage());
        return false;
    }
    updateNavigation();
    return callback();
};