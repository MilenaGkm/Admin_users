import React, { useState } from "react"
import { useForm } from "react-hook-form";
import "../AddUser/NewUser.css"

export default function NewUser(props) {
    const [userForm, setUserForm] = useState({});
    const { register, handleSubmit } = useForm();
    // const onSubmit = data => console.log(data);

    const onSubmit = data => {
        // console.log(data);
        setUserForm(data)
        console.log(userForm);
        props.handleForm()
    }
    console.log(userForm);

    return (
        <div className="lol">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username"> Username:</label>
                <input id="username" {...register("username")} />
                <label htmlFor="password"> Password:</label>
                <input id="password" {...register("password")} />
                <label htmlFor="email"> Email:</label>
                <input id="email" {...register("email")} />
                <label htmlFor="phoneNumber"> Phone Number:</label>
                <input id="phoneNumber" {...register("phoneNumber")} />
                <input type="submit" />
            </form>
        </div>
    );
}