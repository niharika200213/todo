import express, { Request, Response } from "express"
import todos from "../models/todo";

const createTodo = async(req: Request, res: Response, next: any) => {
    try{
        const title:string = req.body.title;
        const content:string = req.body.content;
        const newTodo = await todos.create({title:title, content:content});
        return res.status(201).json(newTodo);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}

const deleteTodo = async(req: Request, res: Response, next: any) => {
    try{
        const todoId:string = req.body.todoId;
        const deletedTodo = await todos.findOneAndDelete({_id: todoId});
        return res.status(200).json(deletedTodo);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}

const updateTodo = async(req: Request, res: Response, next: any) => {
    try{
        const todoId:string = req.body.todoId;
        const title:string = req.body.title;
        const content:string = req.body.content;
        console.log(todoId,title,content)
        const updatedTodo = await todos.findOneAndUpdate({_id:todoId}, {$set:{title:title, content:content}}, {new:true});
        console.log(updatedTodo)
        return res.status(200).json(updatedTodo);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}

const listAllTodos = async(req: Request, res: Response, next: any) => {
    try{
        const pageLimit = 10;
        const page:any = req.params.page;
        const listOfTodos = await todos.find().limit(pageLimit).skip(pageLimit * page).sort({title:"asc"});
        return res.status(200).json(listOfTodos);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}


export{
    createTodo, deleteTodo, updateTodo, listAllTodos
}