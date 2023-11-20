import { type } from "os";
import { db } from "../src/utils/db.server";

type Author  = {
    firstName: string;
    lastName: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            })
        })
    );
    

    const author = await db.author.findFirst({
        where: {
            firstName: "Scott"
        }
    });

    await Promise.all(
        getBooks().map((book) => {
            const {title, isFiction, datePublished} = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: author.id

                }
            });
        })
    )
}



function getAuthors(): Array<Author> {
    return [
        {
            firstName: "Scott",
            lastName: "Fitzgerald"
        },
        {
            firstName: "Leo",
            lastName: "Tolstoy"

        },
        {
            firstName: "Stephen",
            lastName: "King"
        }
    ]
}

function getBooks(): Array<Book> {
    return [
        {
            title: "War and Peace",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "Men at War",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "The Great Gatsby",
            isFiction: true,
            datePublished: new Date()
        },        
    ]
    
}


seed();