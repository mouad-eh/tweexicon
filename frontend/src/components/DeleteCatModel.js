import React, { useContext, useState } from 'react';
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import CustomAutoComplete from './CustomAutoComplete';
import { CategoriesContext } from '../utils/context';
import axios from 'axios';
import { JWT_COOKIE } from '../utils/constants';
import Cookies from 'js-cookie';

export default function DeleteCatModel({ open, setOpen }) {
    const [category, setCategory] = useState({});
    const { categories, setCategories } = useContext(CategoriesContext);
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={(e) => {
                e.preventDefault();
                axios.delete(`${process.env.REACT_APP_CATEGORIES_ENDPOINT}/${category.name}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
                        },
                    }).then((res) => {
                        setCategories(categories.filter(
                            (item) =>
                                item.name !== category.name && item.color !== category.color
                        ));
                    }).catch((err) => console.log(err))
            }}>
                <ModalDialog sx={{
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem"
                }} >
                    <Typography level='h6' fontWeight="bold" textAlign="center">Delete Category</Typography>
                    <Box>
                        <Typography sx={{ mb: "0.25rem" }}>Category</Typography>
                        <CustomAutoComplete placeholder='search...' options={categories}
                            sx={{ width: "100%" }}
                            required
                            onChange={(e, value) => setCategory(value)}
                        // value = {name: "", color: "", ?_id: ""}
                        ></CustomAutoComplete>
                    </Box>
                    <Button color='danger' variant='soft' type='submit'>Delete</Button>
                </ModalDialog>
            </form>
        </Modal >
    )
}