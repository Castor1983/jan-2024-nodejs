import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {UserModel} from "./user.model";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";
import {IActionToken} from "../interfaces/token.interface";

const actionTokenSchema = new Schema({
    actionToken: {type: String, required: true},
   type: {type: String, required: true, enum: ActionTokenTypeEnum },
    _userId: {type: Schema.Types.ObjectId, required: true, ref: UserModel },

   }, {
        timestamps: true,
        versionKey: false
    }
)

export const ActionTokenModel = mongoose.model <IActionToken>('action-tokens', actionTokenSchema);