import express, { Request, Response } from "express"
import todos from "../models/todo";

exports.createTodo = async(req: Request, res: Response, next: any) => {
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

exports.deleteTodo = async(req: Request, res: Response, next: any) => {
    try{
        const todoId:string = req.body.todoId;
        const deletedTodo = await todos.findOneAndDelete({id: todoId});
        return res.status(200).json(deletedTodo);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}

exports.updateTodo = async(req: Request, res: Response, next: any) => {
    try{
        const todoId:string = req.body.todoId;
        const title:string = req.body.title;
        const content:string = req.body.content;
        const updatedTodo = await todos.findOneAndUpdate({id:todoId}, {title:title, content:content}, {
            new: true
          });
        return res.status(200).json(updatedTodo);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}

exports.listAllTodos = async(req: Request, res: Response, next: any) => {
    try{
        const pageLimit = 10;
        const page = req.body.page;
        const listOfTodos = await todos.find().limit(pageLimit).skip(pageLimit * page).sort({title:"asc"});
        return res.status(200).json(listOfTodos);
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}