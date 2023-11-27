import express, { Request, Response } from "express"
import {todos} from "../models/todo";

exports.createTodo = async(req: Request, res: Response, next: any){
    try{
        const title:string = req.body.title;
        const content:string = req.body.content;
        await todos.create({title:title, content:content});
    }
    catch(err){
        if(!err.status)
            err.status = 502;
        next(err);
    }
}