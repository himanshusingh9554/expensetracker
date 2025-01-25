import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses } from '@/redux/expenseSlice';

const CreateExpense = () => {
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        category: "",
    });
    const[loading,setLoading]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const dispatch=useDispatch();
    const {expenses}=useSelector(store=>store.expense);
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent page reload
        console.log(formData);
        // Add your API call here
        try {
            setLoading(true);
            const res=await axios.post("http://localhost:8000/api/v1/expense/add",formData,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setExpenses([...expenses,res.data.expense]))
                toast.success(res.data.message);
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={()=>setIsOpen(true)} variant="outline">Add New Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>
                        Create expense to here. Click add when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="description"
                                className="col-span-3"
                                name="description"
                                value={formData.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                placeholder="xxx in $"
                                name="amount"
                                className="col-span-3"
                                value={formData.amount}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Select onValueChange={changeCategoryHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="rent">Rent</SelectItem>
                                        <SelectItem value="shopping">Shopping</SelectItem>
                                        <SelectItem value="salary">Salary</SelectItem>
                                        <SelectItem value="food">Food</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className='m-full my-4'>
                                <loader2 className='w-full my-4'>Please wait</loader2>
                            </Button>:
                            <Button type="submit">Add</Button>
                        }
                        
                    </DialogFooter>
                </form>
            </DialogContent>
            
        </Dialog>
    );
};

export default CreateExpense;
