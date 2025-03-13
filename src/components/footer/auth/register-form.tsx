"use client";

import React, { useState } from 'react'
import CardWrapper from './card-wrapper';
import {   useForm } from 'react-hook-form';
import {Form, FormControl, FormField, FormDescription, FormLabel, FormItem,FormMessage } from '../ui/form';
import { RegisterSchema } from '../../../schema';
import { Input } from '../ui/input';
import {z} from "zod";
import { Button } from '../ui/button';
import {FormError} from "./form-error";
import {FormSuccess} from "./form-success";
import {zodResolver} from "@hookform/resolvers/zod"
import { register } from '@/actions/register';
import GoogleLogin from './google-button';



const RegisterForm = () => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");


 const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
        email: "",
        name: "",
        password: "",
        passwordConfirmation:"",
    }
 });

 const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    register(data).then((res) => {
        if (res.error) {
            setLoading(false);
            setError(res.error);
            setSuccess("");
          
        } if (res.success) {
            setLoading(false);
            setError("");
            setSuccess(res.success);
        }
        setLoading(false);
    })
    };
    
    return (
   <CardWrapper 
   headerLabel='Kayıt Ol ve Fırsatlardan Yararlanmaya Şimdi Başla'
   title= "Toyzz Box"
   backButtonHref='/login'
   backButtonLabel='Hesanız var ise giriş yapmak için'
   showSocial
  >
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
            <FormField 
            control={form.control}
            name='email'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                         {...field} 
                         placeholder="johndoe@email.com"
                        type='email'
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
                />
                 <FormField 
            control={form.control}
            name='name'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                         {...field} 
                         placeholder="johndoe@email.com"
                        type="text"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
                />
                
                 <FormField control={form.control}
            name='password'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="******"
                        type='password'/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
                />
               <FormField control={form.control}
            name='passwordConfirmation'
            render={({field}) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="******"
                        type='password'/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
                />
                
            </div>
            <FormSuccess message={success}/>
            <FormError message={error}/>
            <Button type="submit" className='w-full' disabled={loading}>
                {loading ? "Loading..." : "Kayıt Ol"}
            </Button>
            
        </form>
    </Form>
  </CardWrapper>
  );
}

export default RegisterForm