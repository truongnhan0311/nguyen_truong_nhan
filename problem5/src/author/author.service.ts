import { db } from "../utils/db.server";
import { type } from "os";


type Author = {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
};


export const listAuthors = async(): Promise<Author[]> => {
    return db.author.findMany(
        {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                createdAt: true
            },
        }
    );
};

export const getAuthor = async(id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id
        }
    });
}

export const createAuthor = async (author: Omit<Author, "id">): Promise<Author> => {
    const {firstName, lastName } = author;
    return db.author.create({
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    });
};