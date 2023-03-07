import { FormControl, FormLabel, Input, Modal, ModalDialog, Typography, Button } from '@mui/joy';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { ChromePicker } from 'react-color';
import { JWT_COOKIE } from '../utils/constants';
import { CategoriesContext } from '../utils/context';

export default function AddCatModel({ open, setOpen }) {
    const [name, setName] = useState("");
    const [color, setColor] = React.useState('#ffffff');
    const { categories, setCategories } = useContext(CategoriesContext);

    const handleChange = (color) => {
        setColor(color.hex);
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={(e) => {
                e.preventDefault();
                axios.post(process.env.REACT_APP_CATEGORIES_ENDPOINT,
                    { name, color },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
                        },
                    }
                ).then((res) => {
                    // console.log(res.data);
                    // it supposed to return the created object (with ID)
                    // the created object can't be returned 
                    // since we are doing an update operation in the DB
                    // object in the list will not have the same properties
                    // newly created objects are added to the list without ID property
                    setCategories([...categories, { name, color }]);
                }).catch((err) => console.log(err))
            }}>
                <ModalDialog sx={{
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: "column",

                    gap: "1rem"
                }} >
                    <Typography level='h6' fontWeight="bold" textAlign="center">Add Category</Typography>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Color</FormLabel>
                        <ChromePicker color={color} onChangeComplete={handleChange}></ChromePicker>
                    </FormControl>
                    <Button color='success' variant='soft' type='submit'>Add</Button>
                </ModalDialog>
            </form>
        </Modal>
    )
}
