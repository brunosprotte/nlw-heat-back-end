import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastTreeMessagesController } from "./controllers/GetLastTreeMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureeAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

router.post(
    "/messages",
    ensureAuthenticated,
    new CreateMessageController().handle
);

router.get(
    "/messages/",
    new GetLastTreeMessagesController().handle
);

export {router};