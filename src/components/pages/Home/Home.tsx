import React, { useState, useEffect, FormEvent } from "react";
import { HomeProps } from "./HomeProps";
import { IUser } from "../../../models/User";
import UsersJson from './users.json';

const Home: React.FC<HomeProps> = (props: HomeProps) => {
    // const [users, setUsers] = useState<IUser[]>(new Array<IUser>());

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/path/to/users.json');

    //             console.log('resp', response);

    //             const data = await response.json();
    //             setUsers(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     fetchData();
    // }, []);

    const [users, setUsers] = useState<IUser[]>(UsersJson);
    const [addMode, setAddMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<IUser | undefined>(undefined);

    const addButtonHandler = () => {
        setAddMode(addmode => !addmode);
    }

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        const newUser: IUser = {
            id: maxId + 1,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            middleName: formData.get("middleName") as string,
            birthDate: formData.get("birthDate") as string,
            prefix: parseInt(formData.get("prefix")?.toString() || "0"),
            phone: parseInt(formData.get("phone")?.toString() || "0"),
            email: formData.get("email") as string,
            city: formData.get("city") as string
        }

        setUsers(users => [...users, newUser]);
        setAddMode(false);
    }

    const editFormSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const editedUser: IUser = {
            id: editMode?.id || 0,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            middleName: formData.get("middleName") as string,
            birthDate: formData.get("birthDate") as string,
            prefix: parseInt(formData.get("prefix")?.toString() || "0"),
            phone: parseInt(formData.get("phone")?.toString() || "0"),
            email: formData.get("email") as string,
            city: formData.get("city") as string
        }

        const updatedUsers: IUser[] = users.map(user => user === editMode ? editedUser : user);

        setUsers(updatedUsers);
        setEditMode(undefined);
    }

    const editButtonHandler = (user: IUser) => {
        setEditMode(user);
    }

    const deleteButtonHandler = (userId: number) => {
        setUsers(users => users.filter(user => user.id !== userId));
    }

    return (
        <div>
            Здесь будет список пользователей
            <ul>
                {users.map(user => <li key={user.id}>
                    <a href={`/user/${user.id}`}>{user.lastName} {user.firstName}</a>
                    <button style={{marginLeft: 10}} onClick={() => editButtonHandler(user)}>Edit user</button>
                    <button style={{marginLeft: 10}} onClick={() => deleteButtonHandler(user.id)}>Delete user</button>
                </li>)}
            </ul>
            {addMode && <form 
                onSubmit={formSubmitHandler}
                style={{
                    display: 'grid', 
                    gridTemplateColumns: '200px 200px 200px',
                    alignContent: 'center', justifyContent: 'center'
                }}>
                <input placeholder="Last name" name="lastName" />
                <input placeholder="First name" name="firstName" />
                <input placeholder="Middle name" name="middleName" />
                <input placeholder="Birth date" name="birthDate" />
                <input placeholder="Phone prefix" name="prefix" />
                <input placeholder="Phone" name="phone" />
                <input placeholder="E-mail" name="email" />
                <input placeholder="City" name="city" />
                <button type={'submit'}>Add</button>
            </form>}
            {editMode && <form 
                onSubmit={editFormSubmitHandler}
                style={{
                    display: 'grid', 
                    gridTemplateColumns: '200px 200px 200px',
                    alignContent: 'center', justifyContent: 'center'
                }}>
                <input placeholder="Last name" name="lastName" defaultValue={editMode?.lastName} />
                <input placeholder="First name" name="firstName" defaultValue={editMode?.firstName} />
                <input placeholder="Middle name" name="middleName" defaultValue={editMode?.middleName} />
                <input placeholder="Birth date" name="birthDate" defaultValue={editMode?.birthDate} />
                <input placeholder="Phone prefix" name="prefix" defaultValue={editMode?.prefix} />
                <input placeholder="Phone" name="phone" defaultValue={editMode?.phone} />
                <input placeholder="E-mail" name="email" defaultValue={editMode?.email} />
                <input placeholder="City" name="city" defaultValue={editMode?.city} />
                <button type={'submit'}>Save</button>
            </form>}
            <div>
                <button onClick={addButtonHandler}>Add new user</button>
            </div>
        </div>
    );
}

export default Home;