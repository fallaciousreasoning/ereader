import { Book } from "epubjs";
import { useEffect, useState } from "react"
import { getBookFromSource } from "../data/db";

export const useBook = (source: string) => {
    const [book, setBook] = useState<Book>()
    useEffect(() => {
        getBookFromSource(source).then(book => setBook(book));
    }, [source]);

    return book;
}