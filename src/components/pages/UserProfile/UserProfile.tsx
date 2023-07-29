import React, { useState } from "react";
import { UserProfileProps } from "./UserProfileProps";
import { useParams } from "react-router-dom";
import { IUser } from "../../../models/User";
import UsersJson from "../Home/users.json";

const UserProfile: React.FC<UserProfileProps> = (props: UserProfileProps) => {

    const params = useParams();
    const userId: number = parseInt(params.id || '0');

    const [user, setUser] = useState<IUser | undefined>(UsersJson.find(user => user.id === userId));

    return (
        <div>
            <div>{user?.lastName} {user?.firstName} {user?.middleName}</div>
            <div>E-mail: {user?.email}</div>
            <div>Phone: +994{user?.prefix}{user?.phone}</div>
            <div>City: {user?.city}</div>
        </div>
    );
}

export default UserProfile;